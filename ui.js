var UI = {};
// Takes in a list of events.

UI.render = function(events) {
	// List the events.
	for (var i in events) {
		var dl = document.getElementById("eventsList");
		var dt = document.createElement("dt");
		
		var currentEvent = events[i];
    	var addPermissions = function(currentEvent, fileId, url) {
  			var participants = currentEvent.participants;
  			for (var i in participants) {
    			DocsClient.instance.addPermissionsParams(fileId, participants[i].email, currentEvent.title);
    			CalendarClient.instance.updateCalendarEvent(currentEvent, url);
  			}
		};

		var func = func1.bind(this, events[i], addPermissions.bind(this, currentEvent));
  		
		h4 = document.createElement("h4");
		h4.appendChild(document.createTextNode(events[i].title));
		dt.appendChild(h4);
		dl.appendChild(dt);
		
		var shortDesc;
		if (events[i].description != null) {
			shortDesc = events[i].description.split(" ", 10).join(' ') + " ...";
		} else {
			shortDesc = "No description available."
		}
		dd1 = document.createElement("dd");
		dd1.appendChild(document.createTextNode(shortDesc));
		dl.appendChild(dd1);
		
		dd2 = document.createElement("dd");
		var a;
		if (!currentEvent.meetingNotesUrl) {
			a = document.createElement("button");
			a.appendChild(document.createTextNode("Add notes"));
	    	if (a.addEventListener) {
	      		a.addEventListener("click", func, false);
	    	} else {
	      		a.attachEvent('onclick', func);b
	    	}
		} else {
			a = document.createElement("a");
			a.setAttribute("href", currentEvent.meetingNotesUrl);
			a.setAttribute("target", "_blank");
			a.appendChild(document.createTextNode("Notes exist for this event"));
		}
		
		dd2.appendChild(a);	
		dl.appendChild(dd2);
		dl.appendChild(document.createElement("hr"));
	}
};

// Callback will be called with url and fileid.
function func1(calEvent, callback) {
  DocsClient.instance.createDocumentForEvent(calEvent.calId, calEvent.eventId, callback);
}
