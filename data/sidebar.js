console.log('SIDEBAR.JS IS LOADED')

addon.port.on("textToSidebar", function(textObject) {
	var action = textObject.action;
	var text = textObject.text;
	console.log('sidebar reports:', action, text)
  	switch (action) {
  		case 'abb-add-to-p':
  			console.log('addtoP')
  			addToParagraph(text);
  			break;
  		case 'abb-new-p':
  			console.log('addnewP')
  			addNewParagraph(text);
  			break;
  		case 'abb-new-section':
  			console.log('newsect')
  			addNewSection(text);
  			break;
  		default:
  			console.log('you did something wrong');
  	}
});

addToParagraph = function (text){
	//find current p. for now we take the last one.
	var container = document.getElementById('content-list');
	if (container.childNodes.length > 0) {
		console.log('The list of childnodes is longer than 0.');
		container.lastChild.innerHTML += text;
	} else {
		//If no p then make new p, (don't eat that yellow snow).
		addNewParagraph(text);
	}

}

addNewParagraph = function (text) {
	var paragraph = document.createElement('p');
	var textNode = document.createTextNode(text);
	paragraph.setAttribute("contentEditable", true);
	paragraph.appendChild(textNode);
	document.getElementById('content-list').appendChild(paragraph);
}

addNewSection = function (text) {
	//What's a new section anyway?
}

document.onkeydown = keyHandler;
document.onmousedown = function (event){
	console.log('click', event.target, event.target.parentNode);
	if(event.target.parentNode === document.getElementById('toolbar')){
		var command = event.target.id;
		console.log(command);
		if (command.toString() === "heading"){
			console.log('ishedings');
			document.execCommand('formatBlock', false, "<h1>");
		} else {
			console.log('isnotheadings');
			document.execCommand(command.toString(), false, "")
		}
	}
};
function keyHandler(event) {
    event = event || window.event;
    if(event.keyCode === 66  && event.ctrlKey) {
        event.preventDefault();
        console.log('ctrlbitch');
        document.execCommand('bold', false, "");
    }
}
