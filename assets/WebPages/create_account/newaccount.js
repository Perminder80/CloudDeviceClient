var send = function(){
	var email = $('#textinput1').val();
	var password = $('#textinput2').val();
	var username = $('#textinput3').val();
	var mobile = $('#textinput4').val();
	var name = $('#textinput5').val();
	sendCreateAccountRequest(email,password,username,mobile,name,receive);
};


var receive = function(httpreq){
	
	if(httpreq.status == 200)
	{
		setCookie('email',$('#textinput1').val(),100);
		setCookie('session',httpreq.getResponseHeader("SessionCookie"),100);
		setCookie('username',$('#textinput3').val(),100);
		
		$('#result').text("account created");
	}else{
		$('#result').text(httpreq.getResponseHeader("error"));
	}
	
}