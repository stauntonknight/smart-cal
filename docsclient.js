var DocsClient = function(oauth) {
  this.oauth = oauth;
};

DocsClient.instance = null;
DocsClient.init = function(oauth) {
  DocsClient.instance = new DocsClient(oauth);
};


// Create a document with title, share it with assignees and Callback with URL.
DocsClient.prototype.createDocumentForEvent_ = function(calEvent, originalCallback) {
  var title = calEvent;
  var assignees = calEvent.participants;
  var url = 'https://www.googleapis.com/drive/v2/files';
  var contentType = 'application/octet-stream';
  var metadata = {
    'title': calEvent.title,
    'mimeType': contentType
  };
  var request = {
    'method': 'POST',
    'body': metadata
  }
  var callback = function(resp) {
    originalCallback(resp.webContentLink);
  };
  this.oauth.sendSignedRequest(url, callback, request);
};


// callback calls back with a url.
DocsClient.prototype.createDocumentForEvent = function(calId, id, callback) {
  // Get meeting details. 
  var eventDetails = function(resp, callback) {
    this.createDocumentForEvent_(resp, callback);
  };
  CalendarClient.instance.getEventDetails(calId, id, eventDetails.bind(this));
};
