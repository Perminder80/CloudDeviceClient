var url = "http://10.0.1.41:8080"

var sendSessionOpenRequest = function(cookie,callback){
	
	var HTTP_Response_Holder = new XMLHttpRequest();
	HTTP_Response_Holder.onreadystatechange  = function(){
		
		if (HTTP_Response_Holder.readyState == 4) {
			callback(HTTP_Response_Holder);
		}
		
	}
	HTTP_Response_Holder.open( "GET", url+'\/opensession?sessioncookie='+cookie+'&time='+new Date().getTime(), true );
	HTTP_Response_Holder.send();
}

var sendLoginRequest = function(email,password,callback){
	var HTTP_Response_Holder = new XMLHttpRequest();
	HTTP_Response_Holder.onreadystatechange  = function(){
		if (HTTP_Response_Holder.readyState == 4) {
			
			callback(HTTP_Response_Holder);
		}
		
	}
	var body = "email="+email+"&password="+password;
	HTTP_Response_Holder.open( "POST", url+'\/login'+'?time='+new Date().getTime(), true );
	HTTP_Response_Holder.send(body);
}

var sendCreateAccountRequest = function(email,password,username,mobile,name,callback){
	var HTTP_Response_Holder = new XMLHttpRequest();
	HTTP_Response_Holder.onreadystatechange  = function(){
		if (HTTP_Response_Holder.readyState == 4) {
			callback(HTTP_Response_Holder);
		}	
	}
	var body = "email="+email+"&password="+password+"&username="+username+"&mobile="+mobile+"&name="+name;
	HTTP_Response_Holder.open( "POST", url+'\/register'+'?time='+new Date().getTime(), true );
	HTTP_Response_Holder.send(body);
}