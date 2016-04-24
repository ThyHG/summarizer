console.log('DATSCRIPT.JS IS LOADED');
var test = "";

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();

    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function doSomethingWithSelectedText(e) {
    /*
    // Handle if action bar is present
    // Then override selectedText
    // The if statement get's 'pushed' regardless if it's undefined, which is strange.
    // If selectedText and Place AND there is no action bar, create one.
    */
    if(document.getElementById('ab-action-bar')) {
        // if target = actionbar button
        if (e.target.parentNode === document.getElementById('ab-action-bar')) {
            console.log('actionbar', test);
            // capture which button
            var selectAction = e.target.id;
            if(selectAction === 'abb-cancel-selection'){
                document.body.removeChild(document.getElementById('ab-action-bar'));
                return;
            }
            // Make an object to throw over the fence - includes selected text and action
            var sendObj = {text: test, action: selectAction};
            // Emit the object
            self.port.emit('selectText', sendObj);
            // Remove the action bar.
            document.body.removeChild(document.getElementById('ab-action-bar'));
        } else {
            // You click outside actionbar? You destroy actionbar.
            document.body.removeChild(document.getElementById('ab-action-bar'));
        }
    }
    // Get the text that is selected.
    var selectedText = getSelectedText();
    if(selectedText != "undefined" && selectedText != null) {
        test = selectedText;
        console.log('pushed!', test);
    }
    // Get coordinates from mouse location -- Not all text documents will have html nodes
    // TODO: Somehow see if the selection is from top -> bot or bot->top
    var place = mouseLocation(e);

    console.log(selectedText, place);
    if (selectedText && place) {
        // Create overlay thinger
        createActionBar(place);
    }
}

createActionBar = function (position) {
    //check if action bar already exists, if so delete previous. <-- gets done in action bar check above
    // Check if action bar doesn't go outside of the window.
    var x = position[0];
    var y = position[1];
    var overlay = document.createElement('DIV');
    overlay.id = 'ab-action-bar'
    overlay.innerHTML = '<div id="abb-add-to-p"></div><div id="abb-new-p"></div><div id="abb-new-section"></div><div id="abb-cancel-selection"></div>';
    overlay.style.top = y + 15 + 'px';
    overlay.style.left = x + 15 + 'px';
    document.body.appendChild(overlay);
}

// Werd.
document.onmouseup = function(e) {
    doSomethingWithSelectedText(e);
}

//This is pretty annoying, but maybe it'll be of use sometime?
// document.onkeyup = doSomethingWithSelectedText;

function mouseLocation(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }

    // Use event.pageX / event.pageY here
    return [event.pageX, event.pageY];
}