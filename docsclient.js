var DocsClient = function(oauth) {
  this.oauth = oauth;
};

DocsClient.instance = null;
DocsClient.init = function(oauth) {
  DocsClient.instance = new DocsClient(oauth);
};

DocsClient.prototype.getCreateRequestParams = function(title) {
  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  var metadata = {
    'title': title,
    'mimeType': 'application/vnd.google-apps.document'
  };

  var contentType = 'application/vnd.google-apps.document';
  var base64Data = '';
  var multipartRequestBody = delimiter + 
    'Content-Type: application/json\r\n\r\n' + JSON.stringify(metadata) +
     delimiter + 'Content-Type: ' + contentType + '\r\n' +
     'Content-Transfer-Encoding: base64\r\n' + '\r\n' + base64Data +
     close_delim;
  var request = {
    'parameters': {'uploadType': 'multipart'},
    'method': 'POST',
    'headers': {
        'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
     },
    'body': multipartRequestBody
  };
  return request;
};


// Create a document with title, share it with assignees and Callback with URL.
DocsClient.prototype.createDocumentForEvent_ = function(calEvent, originalCallback) {
  var assignees = calEvent.participants;
  var url = 'https://www.googleapis.com/upload/drive/v2/files';
  var callback = function(resp) {
    originalCallback(resp.alternateLink);
  };
  this.oauth.sendSignedRequest(url, callback, this.getCreateRequestParams(calEvent.title));
};


// callback calls back with a url.
DocsClient.prototype.createDocumentForEvent = function(calId, id, callback) {
  // Get meeting details. 
  var eventDetails = function(resp, callback) {
    this.createDocumentForEvent_(resp, callback);
  };
  CalendarClient.instance.getEventDetails(calId, id, eventDetails.bind(this));
};
