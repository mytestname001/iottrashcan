/*

	서버 로딩 파트
	1.HTTP 서버
	2.TCP 서버
	3.Tools 스크립트

*/
//var TCPServerProgram = require('./bin/TCP/TCPServerProgram.js');
//var Tools = require('./src/script/tools/Tools.js');
//import ESMtest from './src/script/ESMtest.js';

import HTTPServerProgram from './bin/HTTP/HTTPServerProgram.js';
import TCPServerProgram from './bin/TCP/TCPServerProgram.js';
import Tools from './src/script/tools/Tools.js';
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

async function main(){
	console.log(Tools.TokenGenerator.genToken(16));
	
	
	let localDB = Tools.DatabaseAccessor;
	localDB.checkInitialError();
	
	
	
	TCPServerProgram.startServer();
	HTTPServerProgram.startServer();
	return 0;
}

/*
	함수 및 객체 코드 종료
*/