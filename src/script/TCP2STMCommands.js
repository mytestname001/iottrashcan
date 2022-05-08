module.exports = {
	hello : function(){
		console.log("HELLO WORLD");
	},
	callCommand : function(client, commandString){
		//app passcode
		//TOK
		
		let resultString = commandString;
		
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
				break;
			}
			case 'hel' : {
				client.write("RES OK\r\n");
				break;
			}
			case 'whe' : {
				//뒤에는 토큰이 오도록 되어있다. 나중에 체크해봐야함
				//대상의 토큰과 매핑된 위치를 반환하면 됨
				
				client.write("LOC ???\r\n");
				
				break;
			}
			default : {
				client.write("RES UK\r\n");
				break;
			}
		}
	}
}