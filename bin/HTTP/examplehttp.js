const JSONdb = require('simple-json-db');
const db = new JSONdb('./aa/storage.json');

const dbreader = require('./db.js');


module.exports = {
	callCommand : function(thisString, thisRecog){
		//console.log(thisString+"✨"+JSON.stringify(thisRecog[thisString]));
		
		
		try{
			return this.cmList[thisString](thisRecog[thisString]);
		}catch(e){
			
		}
	},
	cmList : {
		login : function(thisRecog){
			//console.log("로그인 작동"+JSON.stringify(thisRecog));
			//console.log(JSON.stringify(dbreader.read("Users")["alter"]));
			
			//console.log(dbreader.read("Users")[thisRecog["id"]]);
			
			try{
				_userInfo = dbreader.read("Users")[thisRecog["id"]];
				if(_userInfo["password"] == thisRecog["pw"]){
					console.log("로그인 성공!");
					return "success!!!";
				}else{
					console.log("로그인 실패.");
					return "failed";
				}
			}catch(e){
				console.log("아이디 없음");
				return "id not found";
			}
			
			
			

			
			
			//console.log("로그인!!"+JSON.stringify(thisRecog["id"]));
			
		},
		popcorn : function(){
			var kinggod = "Token:";
			
			//this.cmList.kinggod();
			//this.kinggod();
			
			return kinggod+this.makeids(64);
		},
		kinggod : function(){
			return "hello world"
		},
		makeids : function(length){
			var result           = '';
			var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			var charactersLength = characters.length;
			
			for ( var i = 0; i < length; i++ ) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		},
		author : function(){
			return "nobody belong here";
		}
	},
}