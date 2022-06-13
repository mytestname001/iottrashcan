export default {
	genToken : function(length){
		let result							= '';
		let characters 					= 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^*()';
		let charactersLength		= characters.length;
		//let characters 					= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
		
		for(var i=0;i<length;i++){
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		
		return result;
		
	}

}