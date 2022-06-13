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
		
		let _cmd;
		let _args;
		let _res;
		
		console.log(commandString);
		
		let _array = InternalFunction.checkSyntax(commandString);
		
		if(_array[0]){
			//함수가 1을 받아온 경우(파라메터가 여러개);
			_cmd = _array[1];
			_args = _array[2];
		}else{
			//함수가 0을 받아온 경우(파라메터가 없는 커맨드)
			
			_cmd = _array[1];
			_args = "error";
		}
		
		//let _cmd = _array[0];
		//let _args = _array[1];
		
		
		let args = _args;
		let resultString = _cmd; //명령어 코드로 자름
		
		switch(resultString){
			case 'hello':{
				//client.write("helya!\r\n");
				_res = "helya!";
				break;
			}
			case 'bye' : {
				//client.write("seeya\r\n");
				_res = "seeya";
				break;
			}
			case 'whoareu?' : {
				//client.write("monster\r\n");
				_res = "monster";
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
						
						//client.write("TOK " + _token +"\r\n");
						_res = "TOK " + _token;
						//console.log("unknown changes");
						
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
						//client.write("RES NE\r\n");
						_res = "RES NE";
					}
				}else{
				
					//인자가 이상함
					//client.write("RES UK\r\n");
					_res = "RES UK";
				}
				
				//client.write(localDB.db().data.newgod+"\r\n");
				break;
			}
			case 'hel' : {
				//client.write("RES OK\r\n");
				_res = "RES OK";
				break;
			}
			case 'whe' : {
				/*
					위치를 확인하는 커맨드. 별로 의미는 없지만 토큰을 인자에 넣으면 위치를 반환한다.
				*/
				
				
				
				
				if(args.length == 1){
					//whe
					
					let _unknown = Object.keys(localDB.db().data.STM);
					let isFound = false;
					//console.log(_unknown);
					
					for(var i = 0; i < _unknown.length; i++){
						//console.log( );
						if(localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]]._token == args[0]){
							//client.write("LOC " + localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]].location + "\r\n");
							_res = "LOC " + localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]].location;
							isFound = true;
							break;
						}
					}
					
					if(!isFound){
						//client.write("RES UD\r\n")
						_res = "RES UD";
					}
				}else{
					//client.write("RES UK\r\n");
					_res = "RES UK";
				}
				
				//client.write("LOC ???\r\n");
				
				break;
			}
			case 'cap' : {
				/*
					용량을 받는 커맨드. STM 클라이언트가 호출하며 입력받은 용량을 DB에 저장한다
					args에는 token과 capacity가 필요
				*/
				
				if(args.length != 2){
					//client.write("RES UK\r\n");
					_res = "RES UK";
				}else{
					let STMDevices = Object.keys(localDB.db().data.STM);
					let isFound2 = false;
					
					let target;
					
					for(let i = 0; i < STMDevices.length; i++){
						if(localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]]._token == args[0]){
							target = localDB.db().data.STM[Object.keys(localDB.db().data.STM)[i]];
							isFound2 = true;
							
							break;
						}
					}
					
					
					if(isFound2){
						//입력받은 토큰을 가진 계정이 발견되었을 때
						
						if(!isNaN(args[1])){
							//숫자가 맞다면 false
							target.capacity = args[1];
							localDB.dbwrite();
							//client.write("CAP " + args[1] + "\r\n");
							_res = "CAP " + args[1];
							
						}else{
							
							//client.write("RES ER\r\n");
							_res = "RES ER";
						}
					}else{
						//client.write("RES UK\r\n");
						_res = "RES UK";
					}
				}
				
				
				break;
			}
			case 'error' : {
				//client.write("hello king god\r\n");
				_res = "RES ARR";
				break;
			}
			default : {
				//client.write("RES UK\r\n");
				_res = "RES UK";
				break;
			}
		}
		
		return _res;
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
				
				return [1, command, args];
				
			}else{
				//single command
				return [0, localCommandString];
			}
		}else{
			return [0, "error"];
		}
	},
	sendCommand : function(thisString){
		
	}
}