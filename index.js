/*

	서버 로딩 파트
	1.HTTP 서버
	2.TCP 서버

*/
//var TCPServerProgram = require('./bin/TCP/TCPServerProgram.js');
//var Tools = require('./src/script/tools/Tools.js');
//import ESMtest from './src/script/ESMtest.js';

var invisibleVariable = {
	"kinggod" : "newgod"
}

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
	//console.log(invisibleVariable.kinggod);
	console.log(Tools.TokenGenerator.genToken(16));
	
	
	
	
	let localDB = Tools.DatabaseAccessor;
	
	/*
	await localDB.dbread();
	await console.log(Tools.DatabaseAccessor.db());
	//Tools.DatabaseAccessor.db().data ||= {posts:["world","define"],newgod:"king"};
	await console.log(localDB.db().data.passcode = "1q2w3e4r!@");
	await localDB.dbwrite();
	*/
	
	
	
	TCPServerProgram.startServer();
	return 0;
}

/*
	함수 및 객체 코드 종료
*/