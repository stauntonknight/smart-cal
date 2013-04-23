var UI = {};
// Takes in a list of events.
UI.render = function(events) {
	// List the events.
	for (var event in events) {
		var ul = document.getElementById("eventsList");
		var li = document.createElement("li");
		li.appendChild(document.createTextNode("addNotes.html?id=" + event.id));
		ul.appendChild(li);
	}
};
