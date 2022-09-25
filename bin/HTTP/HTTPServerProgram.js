import http from 'http';
import HTTP2MobileCommands from '../../src/script/HTTP2MobileCommands.js';

import fs from 'fs';

export default {
	startServer : function(){
		var server = http.createServer( async (req, res)=>{
			
			/*CORS 해결용 외부 XMLRequest 수락 헤더*/
			
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "https://webdev-dpjhc.run.goorm.io";
      headers["Access-Control-Allow-Methods"] = "POST";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
			
			/*CORS 해결용 외부 XMLRequest 수락 헤더*/
			
			let url = req.url;
			
			if(url == "/"){
				HTTP2MobileCommands.callCommand(req, res);
			}else{
				
				if(url == "/db"){
					
					console.log(process.cwd());
					
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