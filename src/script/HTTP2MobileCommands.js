import Tools from './tools/Tools.js';

let localDB = Tools.DatabaseAccessor; //데이터 베이스에 짧게 엑세스하는 코드

export default {
	hello : function(){
		return "HI";
	},
	callCommand : function(req, res){
		//커맨드 호출 -> recogCommand로... req와 res를 넘김
		this["recogCommand"](req, res);
	},
	recogCommand : function(req, res){
		if(req.method == "POST"){
			let body = '';
			
			req.on('data', function(data){
				body += data;
				
				if(body.length > 1e6)
					req.connection.destory();
			});
			
			req.on('end', function(){
				console.log(body);
				//console.log(body[body.length-1]);
				
				let _body;
				if(body[body.length-1] == "&"){
					_body = body.slice(0, -1);
					body = _body;
				}
				let responseData = MobileCommands.recog(body);
				
				//console.log(responseData);
				res.write(responseData + MobileCommands.getRandom());
				
				res.end();
			});
		}else{
			//요청이 post가 아니라면
			res.write("ERR : parameter must be request on POST method" + MobileCommands.getRandom());
			res.end();
		}
		
		return 0;
	}
}

var GlobalDefine = {
	token : {
		id : "idToken",
		pwd : "pwdToken",
		cmd : "cmdToken",
		tok : "&",
		tokenCode : "tokenCode",
		admin : "adminToken",
		adminID : "adminID",
		adminPW : "adminPW",
		trashcan : "trashcanToken",
		trashcanLOC : "trashcanLoc",
	},
	admin : "killoftheking",
}

/*
var GlobalDefine = {
	token : {
		id : "userID",
		pwd : "userPassword",
		cmd : "cmdToken",
		tok : "&",
		tokenCode : "tokenCode",
		admin : "adminToken",
		adminID : "adminID",
		adminPW : "adminPW",
		trashcan : "trashcanToken",
		trashcanLOC : "trashcanLoc",
	},
	admin : "killoftheking",
}
*/


var MobileCommands = {
	recog : function(thisString){
		//모바일 기기가 보내는 토큰을 분석하기 위한 함수. 모바일 기기가 보내는 신호에 맞춰 분석 코드를 변경하거나,
		//모바일 기기가 보내는 토큰을 설정해야 한다.
		//현재 예상 신호... idToken=myid&pwdToken=1q2w3e4r!@&cmdToken=login...
		
		
		
		let tokenString = thisString;
		
		let POSTMAP = {};
		
		let returnVal;
		
		
		//POSTMAP.hello = "GODD";
		
		
		if(tokenString.includes(GlobalDefine.token.tok)){
			//token이 &로 나누어져 있다면 한 개 이상의 파라메터가 들어온 것
			let splitedToken = tokenString.split(GlobalDefine.token.tok); //idToken=
			for(let i=0;i<splitedToken.length;i++){
				//&로 나눈 토큰들을 
				
				if(splitedToken[i].includes("=")){
					if(splitedToken[i].split("=")[1] == ""){
						returnVal = "ERR : value can not be null";
						return returnVal;
					}else{
						POSTMAP[splitedToken[i].split("=")[0]] = splitedToken[i].split("=")[1];
					}
				}else{
					returnVal = "ERR : data should consist of attribute and key pairs";
					return returnVal;
				}
				
			}
			
			
		}else{
			//토큰이 하나라면 별 다른 파라메터가 없는 것이다
			if(tokenString.includes("=")){
				//토큰이 attribute와 value로 나누어져있다
				
				if(tokenString.split("=")[0] == GlobalDefine.token.cmd){
					//토큰의 attribute가 cmd의 값과 같을 때... 여기서는 "cmdToken"이다
					
					POSTMAP[GlobalDefine.token.cmd] = tokenString.split("=")[1];
				}
				
			}else{
				//토큰이 대체 무슨 값인지 모르겠다
				returnVal = "ERR : data can not be interpret";
				return returnVal;
				
			}
		}
		let _res = MobileCommands.runSwitch(POSTMAP);
		
		if(_res == undefined){
			_res = "ERR : undefined region";
		}
		
		return _res;
	},
	runSwitch : function(thisMap){
		
		let _res;
		let _MAP;
		
		if(thisMap[GlobalDefine.token.cmd] == undefined){
			_res = "ERR : command could not be parsed";
		}else{
			switch(thisMap[GlobalDefine.token.cmd]){
				case 'hello': {
					_res = "RES : we are greeting you!";
					break;
				}
				case 'kinggod': {
					_res = "RES : you are the best!";
					break;
				}
				case 'addaccount': {
					//💎관리자 전용 (직원용 아님)
					/*
						cmdToken = addaccount
						adminToken = killoftheking
						adminID = 내가 원하는 아이디
						adminPW = 내가 원하는 비밀번호
						
						
						
					*/
					if(thisMap[GlobalDefine.token.admin] == GlobalDefine.admin){
						//리퀘스트의 어드민 토큰이 글로벌 정의의 어드민 토큰과 같은지 확인
						
						console.log(thisMap[GlobalDefine.token.adminID]);
						if(thisMap[GlobalDefine.token.adminID] != undefined){
							if(thisMap[GlobalDefine.token.adminID].match(/^[0-9a-z]+$/)){
								//admin ID가 알파뉴메릭으로 구성되어있다
								//_res = "RES : Your input is instited by alphanumeric" + MobileCommands.getRandom();
								if(thisMap[GlobalDefine.token.adminID].length >= 6 && thisMap[GlobalDefine.token.adminID].length <= 20){
									//아이디의 길이가 정상이다
									
									if(thisMap[GlobalDefine.token.adminPW] != undefined){
										if(thisMap[GlobalDefine.token.adminPW].match(/^[0-9a-z!@#$%^&*()-=_+]+$/)){
											
											if(thisMap[GlobalDefine.token.adminPW].length >= 4 && thisMap[GlobalDefine.token.adminPW].length <= 20){
												//패스워드가 4자리에서 20자리 사이
												
												
												//console.log(localDB.db().data.passcode);
												//localDB.db().data.Mobile = {};
												
												if(localDB.db().data.Mobile[thisMap[GlobalDefine.token.adminID]] === undefined){
													localDB.db().data.Mobile[thisMap[GlobalDefine.token.adminID]] = {
														"password" : thisMap[GlobalDefine.token.adminPW],
														"token" : null
													}
												}else{
													localDB.db().data.Mobile[thisMap[GlobalDefine.token.adminID]].password = thisMap[GlobalDefine.token.adminPW];
													//localDB.db().data.Mobile[thisMap[GlobalDefine.token.adminID]].token = "null";
												}
												
												localDB.dbwrite();
												
												_res = "RES : account registed";
												
											}else{
												_res = "ERR : password must be between 4 and 20 characters in length";
											}
										}else{
											_res = "ERR : password does not consist of alphanumeric or special characters";
										}
									}else{
										_res = "ERR : password not defined";
									}
								}else{
									_res = "ERR : id must be between 6 and 20 characters in length";
								}
							}else{
								_res = "ERR : id does not consist of alphanumeric characters";
							}
						}
					}else{
						_res = "ERR : password incorrect";
					}
					
					break;
				}
				case 'login': {
					let token;
					
					if(thisMap[GlobalDefine.token.id] === undefined){
						_res = "ERR : id or password is incorrect";
					}else{
						if(thisMap[GlobalDefine.token.pwd] === undefined){
							_res = "ERR : id or password is incorrect";
						}else{
							
							if(localDB.db().data.Mobile[thisMap[GlobalDefine.token.id]] === undefined){
								_res = "ERR : id or password is incorrect";
							}else{
								if(localDB.db().data.Mobile[thisMap[GlobalDefine.token.id]].password == thisMap[GlobalDefine.token.pwd]){
									token = Tools.TokenGenerator.genToken(16);
									localDB.db().data.Mobile[thisMap[GlobalDefine.token.id]].token = token;
									localDB.dbwrite();
									_res = "TOK : " + token;
								}else{
									_res = "ERR : id or password is incorrect";
								}
							}
						}
					}
					
					
					//접근 권한을 얻기 위한 커맨드
					
					break;
				}
				case 'setloc': {
					//💎관리자 전용 (직원용 아님)
					let isSuccess;
					//위치를 수정하기 위한 커맨드
					
					if(thisMap[GlobalDefine.token.admin] == GlobalDefine.admin){
						//관리자 비밀번호 확인
						if(localDB.db().data.STM[thisMap[GlobalDefine.token.trashcan]] === undefined){
							_res = "ERR : that trashcan is not exist";
						}else{
							//쓰레기통이 존재함
							
							
							if(thisMap[GlobalDefine.token.trashcanLOC] === undefined){
								_res = "ERR : location of trashcan is not defined";
							}else{
								localDB.db().data.STM[thisMap[GlobalDefine.token.trashcan]].location = thisMap[GlobalDefine.token.trashcanLOC];
								localDB.dbwrite();
								
								_res = "RES : trashcan's location of " + thisMap[GlobalDefine.token.trashcan] + " set to " + thisMap[GlobalDefine.token.trashcanLOC];
							}
							
							
						}
					}
					break;
				}
				case 'getlocmap': {
					/*
						cmdToken = getlocmap
						tokenCode = login시 얻은 토큰 예 : dA$nT#VAMdsj9FsJ
					
					*/
					let locmap = {};
					let reqwho;
					let MobileDevices = Object.keys(localDB.db().data.Mobile);
					//전체 쓰레기통 지도를 받아오는 커맨드
					
					if(thisMap[GlobalDefine.token.tokenCode] === undefined){
						_res = "ERR : token must be given";
					}else{
						
						let isFind = false;
						
						for(let i = 0; i < MobileDevices.length; i++){
							
							//console.log();
							
							if(thisMap[GlobalDefine.token.tokenCode] == localDB.db().data.Mobile[Object.keys(localDB.db().data.Mobile)[i]].token){
								reqwho = Object.keys(localDB.db().data.Mobile)[i];
								//_res = "RES : you are " +  + MobileCommands.getRandom();
								isFind = true;
								break;
							}
							
							//console.log(MobileDevices[i]);
						}
						
						
						if(isFind){
							let obArray = Object.keys(localDB.db().data.STM);
							for(let i = 0; i < obArray.length; i++){
								locmap[obArray[i]] = localDB.db().data.STM[obArray[i]].location;
							}
							_res = "MAP : " + JSON.stringify(locmap);
						}else{
							//찾지 못함
							
							_res = "ERR : token is invalid";
						}
						
					}
					/*
					let obArray = Object.keys(localDB.db().data.STM);
					for(let i = 0; i < obArray.length; i++){
						locmap[obArray[i]] = localDB.db().data.STM[obArray[i]].location;
					}
					
					console.log(locmap);
					*/
					
					
					
					//_res = JSON.stringify(locmap);
					break;
				}
				case 'query': {
					let capacity;
					let reqwho;
					let MobileDevices = Object.keys(localDB.db().data.Mobile);
					//특정 쓰레기통의 용량을 받아오는 커맨드
					
					if(thisMap[GlobalDefine.token.tokenCode] === undefined){
						_res = "ERR : token must be given";
					}else{
						
						if(thisMap[GlobalDefine.token.trashcanLOC] === undefined){
							//로그인 토큰은 받았으나 요청할 쓰레기통이 정의되지 않은 경우
							_res = "ERR : location of trashcan must be given";
						}else{
							//쓰레기통 이름은 들어옴
							let isFind = false;
							for(let i = 0; i < MobileDevices.length; i++){
								if(thisMap[GlobalDefine.token.tokenCode] == localDB.db().data.Mobile[Object.keys(localDB.db().data.Mobile)[i]].token){
									//주어진 로그인 토큰이 있는 계정을 찾은 경우
									
									reqwho = Object.keys(localDB.db().data.Mobile)[i]; //reqwho에 계정 이름을 넣음
									isFind = true;
									break;
								}
							}
							
							
							if(isFind){
								//입력받은 로그인 토큰을 배정받은 계정이 있는 경우
								let STMDevices = Object.keys(localDB.db().data.STM);
								let isFind2 = false;
								
								for(let i = 0; i < STMDevices.length; i++){
									//STM Device중에 찾음
									if(thisMap[GlobalDefine.token.trashcanLOC] == localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]].location){
										//위치값이 같은 쓰레기통을 찾음
										capacity = localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]].capacity;
										isFind2 = true;
										break;
									}
									
									
								}
								
								if(isFind2){
									_res = "CAP : " + capacity;
								}else{
									_res = "ERR : there is no trashcan such as your input";
								}
								
								
							}else{
								//그런 계정이 없는 경우
								_res = "ERR : token is invalid";
							}
							
							
						}
					}
					break;
				}
				default : {
					_res = "ERR : unknown command";
					break;
				}
			}
		}
		return _res;
	},
	getRandom : function(){
		return " ["+Math.round(Math.random()*1000)+"]";
	}
}