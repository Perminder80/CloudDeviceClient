
var img = function(){
	JSInterface.img();
};



var imgok = function(str){
	console.log(str);
	preload_image_object = new Image();
	preload_image_object.src = str;
	//document.write("img src="+str+">");
	var DOM = '<img src="'+str+'" height="200" width="200">'
	$("#result").append(DOM);
	$("#result").trigger("create");
};
