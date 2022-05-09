import Tools from './tools/Tools.js';

let localDB = Tools.DatabaseAccessor; //데이터 베이스에 짧게 엑세스하는 코드
let clients = {};

export default {
	hello : function(){
		console.log("HELLO WORLD");
	},
	callCommand : function(client, commandString){
		//app passcode
		//TOK
		
		console.log(commandString);
		
		let _array = InternalFunction.checkSyntax(commandString);
		let _cmd = _array[0];
		let _args = _array[1];
		
		
		let args = _args;
		let resultString = _cmd; //명령어 코드로 자름
		
		switch(resultString){
			case 'hello':{
				client.write("helya!\r\n");
				break;
			}
			case 'bye' : {
				client.write("seeya\r\n");
				break;
			}
			case 'whoareu?' : {
				client.write("monster\r\n");
				break;
			}
			case 'app' : {
				/*
					로그인 커맨드 인자는 비밀번호가 와야하며 서버는 토큰을 반환한다
				*/
				//localDB.db().newgod;
				
				if(args.length == 2){
					//app <passcode> <mac address>
					
					//console.log(localDB.db().data.STM.kingsman === undefined);
					
					if(args[0] == localDB.db().data.passcode){
						//입력된 인자가 패스코드와 일치하는가? == YES
						
						let _token = Tools.TokenGenerator.genToken(8);
						
						client.write("TOK " + _token +"\r\n");
						//console.log("시발 누가 맞췄어");
						
						if(localDB.db().data.STM[args[1]] === undefined){
							//처음 나타난 장치
							localDB.db().data.STM[args[1]] = {
								"_token" : _token,
								"location" : "unknown",
								"capacity" : 3.14,
							}
							localDB.dbwrite();
						}else{
							//이전의 기록이 있음
							localDB.db().data.STM[args[1]]._token = _token;
							localDB.dbwrite();
						}
						
					}else{
						//비밀번호가 맞지 않음
						client.write("RES NE\r\n");
					}
				}else{
				
					//인자가 이상함
					client.write("RES UK\r\n");
				}
				
				//client.write(localDB.db().data.newgod+"\r\n");
				break;
			}
			case 'hel' : {
				client.write("RES OK\r\n");
				break;
			}
			case 'whe' : {
				/*
					위치를 확인하는 커맨드. 별로 의미는 없지만 토큰을 인자에 넣으면 위치를 반환한다.
				*/
				
				
				
				
				if(args.length == 1){
					//whe
					
					let _unknown = Object.keys(localDB.db().data.STM);
					
					//console.log(_unknown);
					
					for(var i = 0; i < _unknown.length; i++){
						//console.log( );
						if(localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]]._token == args[0]){
							client.write("LOC " + localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]].location + "\r\n");
						}
					}
				}else{
					client.write("RES UK\r\n");
				}
				
				//client.write("LOC ???\r\n");
				
				break;
			}
			default : {
				client.write("RES UK\r\n");
				break;
			}
		}
	}
}






var InternalFunction = {
	checkSyntax : function(thisString){
		if(thisString.includes("EOF")){
			//글자에 EOF가 있다면 --> test <arg1> <arg2>EOF
			let localCommandString = thisString.split("EOF")[0];
			if(localCommandString.includes(" ")){
				let command = localCommandString.split(" ")[0];
				let args = localCommandString.split(" ");
				args.splice(0, 1);
				
				return [command, args];
				
			}else{
				//single command
				return localCommandString;
			}
		}else{
			return "error"
		}
	}
}