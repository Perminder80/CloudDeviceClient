
var send = function(){
	var to = $('#textinput1').val();
	var content = $('#textarea1').val();
	
	/*console.log(to);
	console.log(topic);
	console.log(content);
	*/
	
	if((to=="")){
		alert("fill a number");
	}	
	else{
		JSInterface.sendSMS(to,content);
	}
	
};


var autofill = function(){
	$('#textinput1').val('+33685791559');
	$('#textarea1').val('Automatic send:\nI\'m Benoit');
};