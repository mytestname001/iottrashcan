import http from 'http';
import HTTP2MobileCommands from '../../src/script/HTTP2MobileCommands.js';

import fs from 'fs';

export default {
	startServer : function(){
		var server = http.createServer( async (req, res)=>{
			res.writeHead(200);
			
			let url = req.url;
			
			if(url == "/"){
				HTTP2MobileCommands.callCommand(req, res);
			}else{
				
				if(url == "/db"){
					res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
					res.end(fs.readFileSync("./src/database/db.json"));
				}else if(url == "/code"){
					res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
					res.end(fs.readFileSync("./src/script/HTTP2MobileCommands.js"));
				}else{
					res.write("no url require");
					res.end();
				}
			}
			
		});
		server.listen(80, ()=>{
			console.log("HTTP 서버가 연결을 기다리는중...");
		});
	}
}