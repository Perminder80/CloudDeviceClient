var start = function(){
	var username = getCookie('username')
	$('#welcome').text('welcome '+username);
}

var testOpen = function(){
	 //test if the session is open
	 var cookie =  getCookie('session');
	 isSessionOpen(cookie);
}

var logout = function(){
	 //delete the session cookie
	 setCookie('session','',-1);
	 //redirect to the login page
	 window.location.replace('..\/identification\/log.html');
}

var isSessionOpen = function(cookie){
	sendSessionOpenRequest(cookie,receive);
}

var receive = function(httpreq){
	
	if(httpreq.status == 200){
		//if yes then display the user name
	 }else
	 {
		//if no then redirect to the login page
		window.location.replace('..\/identification\/log.html');
	 }

}

testOpen();

$('div:jqmData(role="page")').live('pageshow',function(){
	start();
});