var UI = {};
// Takes in a list of events.
UI.render = function(events) {
	// List the events.
	for (var i in events) {
		var ul = document.getElementById("eventsList");
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.setAttribute("href", "addNotes.html?id=" + events[i].eventId
			+ "&title=" + events[i].title);
		a.setAttribute("target", "_blank")
		a.appendChild(document.createTextNode(events[i].title));
		li.appendChild(a);
		ul.appendChild(li);
	}
};
