
var repertory = function(){

	$.mobile.loading( 'show', {text: "retrieving contacts", textVisible: true, textonly: false });
	
	setTimeout(repert,1);
};

var repert = function(){
	
	//test
	//var JSONrep = {"contacts":[{"Name":"fabien","Visible":1,"Number":["bla","bli"],"Email":["bla"]},{"Name":"benoit","Visible":1,"Number":["bli"],"Email":["blo"]}]};
	var rep = JSInterface.rep();
	console.log(rep);
	var JSONrep = JSON.parse(rep);

	var domForm = createDom(JSONrep);
	
	$("#result").append(domForm);
	$("#result").trigger("create");
	
	$.mobile.loading( 'hide');

}


var createDom = function(JSONrep){

	var DOM = '<div data-inset ="false">'
	
	var nbContacts = JSONrep.contacts.length;
	var i = 0;
	var j = 0;
	
	for(i = 0;i<nbContacts;i++){
		
		var nbNumber = JSONrep.contacts[i].Number.length;
		var nbMail = JSONrep.contacts[i].Email.length;
		
		if( nbNumber + nbMail > 0){
		
			if(JSONrep.contacts[i].Visible == true){
				DOM = DOM +'<div  data-role="collapsible" data-inset ="false" ><h2>'+JSONrep.contacts[i].Name+JSONrep.contacts[i].Visible+'</h2><fieldset data-role="controlgroup">'
				
				console.log(nbNumber+"  "+nbMail);
				
				for(j = 0; j < nbNumber;j++){
					DOM = DOM+'<label><input type="checkbox" name="Number-'+j+'0" />'+JSONrep.contacts[i].Number[j]+'</label>';
				}
				for(j = 0; j < nbMail;j++){
					DOM = DOM+'<label><input type="checkbox" name="Number-'+j+'0" />'+JSONrep.contacts[i].Email[j]+'</label>';
				}
				
				DOM = DOM + '</ul></fieldset></div>';
			}
		}
	}
	
	DOM = DOM + "</div>"
	console.log(DOM);
	return DOM;

};