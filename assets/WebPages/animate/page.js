
var touchDown = function(xt,yt){
	process(xt,yt);
}
var touchUp = function(x,y){
}
var touchMove = function(x,y){
}

var timer = 0;
var state = 0;

function process(x,y){
	
	var top = document.getElementById('animatedButton').offsetTop;
	var bottom = document.getElementById('animatedButton').offsetTop + document.getElementById('animatedButton').offsetHeight;
	var left = document.getElementById('animatedButton').offsetLeft;
	var right = document.getElementById('animatedButton').offsetLeft + document.getElementById('animatedButton').offsetWidth;
	if(x>left && x<right){
		if(y>top && y <bottom){
			timer = 50;
			if(state == 0)
				animatedButton.style.backgroundColor = "yellow";
			if(state == 1)
				animatedButton.style.backgroundColor = "red";
			if(state == 2)
				animatedButton.style.backgroundColor = "green";
				
			state++;
			if(state == 3)
				state =0;
		}
	}


}

var dX = 1;
var dY = 1;
var X = 0;
var Y = 0;
var timer = 200;

window.onload = init;

function init(){

	var id = setInterval(function() {
		
		
		if(timer < 0){
		
			X = X + dX;
			Y = Y+dY;
			
			animatedButton.style.left = X + "%";
			animatedButton.style.top = Y + "%";
			
			animatedButton.style.right = (40-X) + "%";
			animatedButton.style.bottom = (85-Y) + "%";
			
			if(X>40){
			dX = -dX;
			}
			if(Y>85){
			dY = -dY;
			}
			
			if(X<0){
			dX = -dX;
			}
			if(Y<0){
			dY = -dY;
			}
		}else{
			timer--;
		}
		 
	}, 20)
}
