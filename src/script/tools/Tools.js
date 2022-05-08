module.exports = {
	genToken : function(length){
		let result							= '';
		let characters 					= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength		= characters.length;
		
		
		for(i=0;i<length;i++){
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		
		return result;
		
	}

}