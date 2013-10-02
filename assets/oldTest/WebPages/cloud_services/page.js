
$('div:jqmData(role="page")').live('pageshow',function(){
   
   if(!((getCookie('facebook_token')==null) ||(getCookie('facebook_token')=='undefined'))){
		$('#FBstatus').html('connected, the token is: '+getCookie('facebook_token'));
		$("#FBbutton .ui-btn-text").text("disconect");
	}
   if(!((getCookie('linkedin_token')==null) ||(getCookie('linkedin_token')=='undefined'))){
		$('#LDstatus').html('connected, the token is: '+getCookie('linkedin_token'));
		$("#LDbutton .ui-btn-text").text("disconect");
	}
	if(!((getCookie('dropbox_token')==null) ||(getCookie('dropbox_token')=='undefined'))){
		$('#DBstatus').html('connected, the token is: '+getCookie('dropbox_token'));
		$("#DBbutton .ui-btn-text").text("disconect");
	}
	if(!((getCookie('skydrive_token')==null) ||(getCookie('skydrive_token')=='undefined'))){
		$('#SDstatus').html('connected, the token is: '+getCookie('skydrive_token'));
		$("#SDbutton .ui-btn-text").text("disconect");
	}
   
});

var FBbutton = function()
{
	console.log(getCookie('facebook_token'));
	if((getCookie('facebook_token')==null) ||(getCookie('facebook_token')=='undefined')){

		//DO STUFF
			setCookie('facebook_token','aaaaaaaaaaaaaaa',7);
			
		//Example to test
		
		$('#FBstatus').html('connected, the token is: '+getCookie('facebook_token'));
		$("#FBbutton .ui-btn-text").text("disconect");
	
	}else{
		
		setCookie('facebook_token','undefined')
		$('#FBstatus').html('disconnected');
		$("#FBbutton .ui-btn-text").text("connect");
	}
}

var LDbutton = function()
{
	console.log(getCookie('linkedin_token'));
	if((getCookie('linkedin_token')==null) ||(getCookie('linkedin_token')=='undefined')){

		//DO STUFF
			setCookie('linkedin_token','bbbbbbbbbbbbbbbbbbb',7);
		//Example to test
		$('#LDstatus').html('connected, the token is: '+getCookie('linkedin_token'));
		$("#LDbutton .ui-btn-text").text("disconect");
	
	}else{
		
		setCookie('linkedin_token','undefined')
		$('#LDstatus').html('disconnected');
		$("#LDbutton .ui-btn-text").text("connect");
	}
}

var DBbutton = function()
{
	console.log(getCookie('dropbox_token'));
	if((getCookie('dropbox_token')==null) ||(getCookie('dropbox_token')=='undefined')){

		//DO STUFF
			setCookie('dropbox_token','ccccccccccccccccccccc',7);
		//Example to test
		$('#DBstatus').html('connected, the token is: '+getCookie('dropbox_token'));
		$("#DBbutton .ui-btn-text").text("disconect");
	
	}else{
		
		setCookie('dropbox_token','undefined')
		$('#DBstatus').html('disconnected');
		$("#DBbutton .ui-btn-text").text("connect");
	}
}

var SDbutton = function()
{
	console.log(getCookie('skydrive_token'));
	if((getCookie('skydrive_token')==null) ||(getCookie('skydrive_token')=='undefined')){

		//DO STUFF
			setCookie('skydrive_token','dddddddddddddddddddddddd',7);
		//Example to test
		$('#SDstatus').html('connected, the token is: '+getCookie('skydrive_token'));
		$("#SDbutton .ui-btn-text").text("disconect");
	
	}else{
		
		setCookie('skydrive_token','undefined')
		$('#SDstatus').html('disconnected');
		$("#SDbutton .ui-btn-text").text("connect");
	}
}

function eraseCookie(key) {  
	document.cookie = key + '= ;expires=-1';  
}

function setCookie(key, value) {  
   var expires = new Date();  
   expires.setTime(expires.getTime() + 31536000000); //1 year  
   document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();  
}  
  
function getCookie(key) {  
   var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');  
   return keyValue ? keyValue[2] : null;  
}
 
/*FB.login(function(response) {
   if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
   } else {
     console.log('User cancelled login or did not fully authorize.');
   }
});
  */ 
   