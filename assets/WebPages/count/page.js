var i = 0;


var touchDown = function(xt,yt){
	process(xt,yt);
}
var touchUp = function(x,y){
}
var touchMove = function(x,y){
}

var process = function(x,y){

	var top = document.getElementById('countJava').offsetTop;
	var bottom = document.getElementById('countJava').offsetTop + document.getElementById('countJava').offsetHeight;
	var left = document.getElementById('countJava').offsetLeft;
	var right = document.getElementById('countJava').offsetLeft + document.getElementById('countJava').offsetWidth;
	if(x>left && x<right){
		if(y>top && y <bottom){
			JSInterface.addadd();
			document.getElementById('countJava').innerHTML = JSInterface.get();
		}
	}
	
	var top = document.getElementById('countJS').offsetTop;
	var bottom = document.getElementById('countJS').offsetTop + document.getElementById('countJS').offsetHeight;
	var left = document.getElementById('countJS').offsetLeft;
	var right = document.getElementById('countJS').offsetLeft + document.getElementById('countJS').offsetWidth;
	if(x>left && x<right){
		if(y>top && y <bottom){
			i++;
			document.getElementById('countJS').innerHTML = i;
		}
	}

}