window.onload = init;
var touching = 0;
var x = 0;
var y = 0;

var touchDown = function(xt,yt){
	x = xt;
	y = yt;
	console.log("down");
}
var touchUp = function(x,y){
console.log("up");
}
var touchMove = function(x,y){
	process(y,x);
	console.log("Move");
}

var process = function(xt,yt){
	/*console.log(x +" "+ y + " "+document.getElementById('dragButton').offsetLeft + " "+(document.getElementById('dragButton').offsetLeft + document.getElementById('dragButton').offsetHeight)
	+ " "+document.getElementById('dragButton').offsetTop +" "+
	(document.getElementById('dragButton').offsetTop + document.getElementById('dragButton').offsetWidth ));*/
	
	var top = document.getElementById('dragButton').offsetTop;
	var bottom = document.getElementById('dragButton').offsetTop + document.getElementById('dragButton').offsetWidth;
	var left = document.getElementById('dragButton').offsetLeft;
	var right = document.getElementById('dragButton').offsetLeft + document.getElementById('dragButton').offsetHeight;
	
	/*console.log(x +" "+ y + " "+ left + " " +top+ " "+right +" "+ bottom);
	
	//if((x>left) && (x<right)){
	//	if((y>top) && (y<bottom)){
			console.log("inButton");
			dragButton.style.left = (left+xt)+ "px";
			dragButton.style.right = (document.body.clientWidth  -(right+xt))+ "px";
			//document.getElementById('dragButton').posLeft = 100;
			//document.getElementById('dragButton').Top = document.getElementById('dragButton').offsetTop + yt - y;
			//x = xt;
			//y = yt;
			dragButton.style.top = (top+yt)+ "px";
			//dragButton.style.bottom = (document.body.clientHeight  -(top+yt))+ "px";
			dragButton.style.bottom = "0px";
		//}
	//}*/
	
	X = xt;
	Y = yt;
			
	animatedButton.style.left = X;
	animatedButton.style.top = Y;
	
	animatedButton.style.right = (40-X);
	animatedButton.style.bottom = (85-Y);

}

function init(){
	console.log(document.getElementById('dragButton').offsetLeft);
	dragButton.style.bottom = "0px";
	dragButton.style.top = "0px";
	dragButton.style.right = "0px";
	dragButton.style.left = "0px";
}