var start = function(){
	var email =  getCookie('email');
	$('#textinput1').val(email);
}

var send = function(){
	var login = $('#textinput1').val();
	var password = $('#textinput2').val();
	console.log("send login request");
	sendLoginRequest(login,password,receive);
}

var createAccount = function(){
	window.location.href = '..\/create_account\/newaccount.html';
}

var receive = function(httpreq){
	console.log("receive login request "+httpreq.status);
	if(httpreq.status == 200){
		setCookie('email',$('#textinput1').val(),7);
		setCookie('session',httpreq.getResponseHeader("SessionCookie"),100);
		setCookie('username',httpreq.getResponseHeader("username"),100);
		window.location.replace('..\/user_menu\/menu.html');
	}else{
		$('#result').text(httpreq.getResponseHeader("error"));
	}
	
}

////////////////////////////////////

$('div:jqmData(role="page")').live('pageshow',function(){
	start();
});