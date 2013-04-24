if (document.getElementById() != null){
	var elems = document.getElementsByTagName('div');
	for (var i in elems) {
		if(elems[i].getAttribute('class') == "ui-sch-schmedit") {
			addButton();
		}
	}
}

function addButton(){
var form = createElement("form");
form.setAttribute("method", "get");
form.setAttribute("action", "addNotes.html");
var submit = createElement("submit");
submit.setAttribute("value", "Add notes");
form.appendChild(submit);
var titleInput = createElement("input");
titleInput.setAttribute("type", "hidden");
var elems = document.getElementsByTagName('div');
for (var i in elems) {
	if(elems[i].getAttribute('class') == "ui-sch-schmedit") {
		titleInput.setAttribute("value", elems[i].innerHTML);
	}
}
form.appendChild(titleInput);
var n = document.getElementByTagName('table')[0].rows.length();
var row = document.getElementByTagName('table')[0].insertRow(n);
var cell = row.insertCell(0);
cell.appendChild(form);
}