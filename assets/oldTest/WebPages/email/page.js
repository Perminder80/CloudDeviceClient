
var send = function(){
	var to = $('#textinput1').val();
	var topic = $('#textinput2').val();
	var content = $('#textarea1').val();
	
	/*console.log(to);
	console.log(topic);
	console.log(content);
	*/
	
	if((to=="")||(topic=="")||(content=="")){
		alert("all the area must be filled");
	}	
	else{
		JSInterface.sendEmail(to,topic,content);
	}
	
};


var autofill = function(){
	$('#textinput1').val('heroux.benoit.test@gmail.com');
	$('#textinput2').val('automatic send');
	$('#textarea1').val('Hey \nI\'m Benoit');
	//$('#textarea1').​​​​​​attr("rows",4)​​​​​​;
};