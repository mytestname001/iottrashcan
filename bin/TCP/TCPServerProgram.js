var net = require('net');
var TCP2STMCommands = require('../../src/script/TCP2STMCommands.js');

var clients = [];

module.exports = {
	startServer : function(){
		var server = net.createServer(function(client){
			
			clients.push(client);
			console.log(clients.length);
			
			client.on('data', function(data){
				//클라이언트가 데이터를 받음📋
				
				console.log('Client sent : ' + data.toString());
				//client.write("HELLO WORLD");
				
				TCP2STMCommands.callCommand(client, data.toString());
				
			});
			
			client.on('end', function(){
				//누군가 나갔다. ✨
				console.log("누군가 나갔습니다.");
				internalFunction.clearClients(clients);
			});

			client.on('error', function(){
				//누군가 오류로 끊겼다. ✨
				console.log("누군가 사라졌다.");
				internalFunction.clearClients(clients);
			});
			
			client.write("CON OK\r\n");
			
		}); //createServer 코드 종료
		
		server.listen(8107, function(){
			console.log('서버가 연결을 기다리는중.');
		});
	} //서버 시작 객체 끝
} //모듈 출력 끝


var internalFunction = {
	clearClients : function(thisClients){
		//연결이 끊긴 소켓을 제거
		for(i=0;i<thisClients.length;i++){
			if(thisClients[i]._readableState.ended){
				thisClients.splice(i, 1);
			}
		}
	}
}