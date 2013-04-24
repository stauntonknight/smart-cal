var UI = {};
// Takes in a list of events.



UI.render = function(events) {
	// List the events.
	for (var i in events) {
		var dl = document.getElementById("eventsList");
		var dt = document.createElement("dt");
		var a = document.createElement("a");
//		a.setAttribute("href", "addNotes.htm/l?id=" + events[i].eventId
//			+ "&title=" + events[i].title);
//		a.setAttribute("target", "_blank");

    var func = func1.bind(this, events[i], callback);
	if (a.addEventListener) {
      a.addEventListener("click", func, false);
    } else {
      a.attachEvent('onclick', func);
    }
		a.appendChild(document.createTextNode("Create notes"));
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
		dd2.appendChild(a);
		dl.appendChild(dd2);
		dl.appendChild(document.createElement("hr"));
	}
};

// Callback will be called with url and fileid.
function func1(calEvent, callback) {
	alert("jkds");
	
	var callback = function(url, fileId, calEvent.attendees) {
		for (var i in participants) {

			var body = {
				'value': participants[i].emai,
				'type': "user",
				'role': "writer"
			};
			var request = gapi.client.drive.permissions.insert({
			    'fileId': fileId,
			    'resource': body
			  }); 
			request.execute(function(resp) {});
		}
	};
	
  DocsClient.instance.createDocumentForEvent(calEvent.calId, calEvent.eventId, callback);

}
