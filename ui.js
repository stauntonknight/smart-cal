var UI = {};
// Takes in a list of events.
UI.render = function(events) {
	// List the events.
	for (var i in events) {
		var ul = document.getElementById("eventsList");
		var li = document.createElement("li");
		var a = document.createElement("div");
		a.appendChild(document.createTextNode(events[i].title));
    var bp = chrome.extension.getBackgroundPage();
    var callback = function(calEvent) {
      if (calEvent) {
        // Share it with docs and create a 
      }
    };
    DocsClient.instance.createDocumentForEvent(events[i].calId, events[i].eventId, callback);
		li.appendChild(a);
		ul.appendChild(li);
	}
};


// DocsClient.instance.createDocument(title, function(url) {
//   // Create a link with anchor <a href="url" target="_>Meeting notes for Title</a>
// });
