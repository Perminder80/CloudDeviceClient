var launch = function(){
	
	setTimeout(
		function (){
			var cookie =  getCookie('session');
			sendSessionOpenRequest(cookie,receive);
         }, 2000);
}

var receive = function(httpreq){
	if(httpreq.status == 200){
		window.location.replace('user_menu\/menu.html');
	}else
	{
		window.location.replace('identification\/log.html');
	}
}