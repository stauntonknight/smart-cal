var DocsClient = function(oauth) {
  this.oauth = oauth;
};

DocsClient.instance = null;
DocsClient.init = function(oauth) {
  DocsClient.instance = new DocsClient(oauth);
};

DocsClient.prototype.getCreateRequestParams = function(title) {
  var metadata = {
    'title': title,
    'mimeType': 'text/plain',
  };
  var request = {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json'
     },
    'body': JSON.stringify(metadata),
    'parameters': {
        'convert': true
     }
  };
  return request;
};


// Create a document with title, share it with assignees and Callback with URL.
DocsClient.prototype.createDocumentForEvent_ = function(calEvent, originalCallback) {
  var assignees = calEvent.participants;
  var url = 'https://www.googleapis.com/drive/v2/files';
  var callback = function(resp) {
    var respJson = JSON.parse(resp);
    originalCallback(respJson.id, respJson.alternateLink);
  };
  this.oauth.sendSignedRequest(url, callback, this.getCreateRequestParams(calEvent.title));
};


// callback with a url and fileId.
DocsClient.prototype.createDocumentForEvent = function(calId, id, callback) {
  // Get meeting details. 
  var onEventDetails = function(calEvent) {
    this.createDocumentForEvent_(calEvent, callback);
  };
  CalendarClient.instance.getEventDetails(calId, id, onEventDetails.bind(this));
};


DocsClient.prototype.createAddPermissionsRequest = function(email, fileId, title) {
  var message;
  if (title)  {
    message = 'I have created a metting notes for ' + title;
  } else {
    message = 'Meeting notes';
  }
  var params = {
    'fileId': fileId,
    'emailMessage' : message
  };
  var bodyJson = {
    'role': 'writer',
    'type': 'user',
    'value': email
  };
  var request = {
    'method': 'POST',
    'body': JSON.stringify(bodyJson),
    'headers': {
        'Content-Type': 'application/json'
     },
    'parameters': params
  };
  return request;
};


DocsClient.prototype.addPermissionsParams = function(fileId, email, title) {
  var url = 'https://www.googleapis.com/drive/v2/files/' + fileId + '/permissions';
  var callback = function(resp) {
    console.log(resp);
  };
  this.oauth.sendSignedRequest(url, callback, this.createAddPermissionsRequest(email, fileId, title));
};
