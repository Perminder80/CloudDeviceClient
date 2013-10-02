var send = function(){
	
	 var HTTP_Response_Holder = new XMLHttpRequest();
     //HTTP_Response_Holder.onload = process ;
	
	HTTP_Response_Holder.onreadystatechange  = function(){
		
		if (HTTP_Response_Holder.readyState == 4) {
			//console.log(HTTP_Response_Holder.status);
			//console.log(HTTP_Response_Holder.response);
			
			$('#answer').text(HTTP_Response_Holder.getResponseHeader("Location"));
			dump(HTTP_Response_Holder);
		}
		
	}
	//console.log($('#textinput1').val());
	//console.log($('#textinput2').val());
	var body = "login="+$('#textinput1').val()+"&password="+$('#textinput2').val();
	//HTTP_Response_Holder.open( "GET", "http://cloud.chiswicklab.com:8080/cloud/spring_security_login", true );
	HTTP_Response_Holder.open( "POST", "http://10.0.1.71:8080", true );
	//dump(HTTP_Response_Holder);
	//HTTP_Response_Holder.end(body);
    HTTP_Response_Holder.send(body);
};



////////////////////////////////////
var autofill = function(){
	$('#textinput1').val('benben');
	$('#textinput2').val('benben');
};

function dump(obj) {
	var out = '';
	for (var i in obj) {
		console.log(i + ": " + obj[i] + "\n");
	}
}












/* ////////////////////OK WITH PERMINDER NODE.JS --> JUST CHANGE IP ADRESS
var send = function(){
	
	 var HTTP_Response_Holder = new XMLHttpRequest();
     //HTTP_Response_Holder.onload = process ;
	
	HTTP_Response_Holder.onreadystatechange  = function(){
		
		if (HTTP_Response_Holder.readyState == 4) {
			$('#answer').text(HTTP_Response_Holder.responseText);
			console.log(HTTP_Response_Holder.status);
			console.log(HTTP_Response_Holder.response);
			//dump(HTTP_Response_Holder);
		}
		
	}
	console.log($('#textinput1').val());
	console.log($('#textinput2').val());
	var body = "login="+$('#textinput1').val()+"&password="+$('#textinput2').val();
	HTTP_Response_Holder.open( "POST", "http://10.0.1.60:8080", true );
	//dump(HTTP_Response_Holder);
	//HTTP_Response_Holder.end(body);
    HTTP_Response_Holder.send(body);
};



////////////////////////////////////
var autofill = function(){
	$('#textinput1').val('mylogin');
	$('#textinput2').val('mypassword');
};

function dump(obj) {
	var out = '';
	for (var i in obj) {
		console.log(i + ": " + obj[i] + "\n");
	}
}*/