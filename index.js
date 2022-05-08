/*

	서버 로딩 파트
	1.HTTP 서버
	2.TCP 서버

*/
var TCPServerProgram = require('./bin/TCP/TCPServerProgram.js');



/*
	메인 코드 시작
*/

main();

/*
	메인 코드 종료
*/






/*
	함수 및 객체 코드 시작
*/

function main(){
	console.log("TEST MAIN");
	TCPServerProgram.startServer();
	return 0;
}

/*
	함수 및 객체 코드 종료
*/