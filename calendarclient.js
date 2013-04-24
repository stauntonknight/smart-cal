CalendarClient = function(oauth) {
  this.oauth = oauth;
};

CalendarClient.instance = null;

CalendarClient.init = function(oauth) {
  CalendarClient.instance = new CalendarClient(oauth);
};

var parseEvent = function(eventJson, id) {
  if (eventJson.status == "cancelled") return null;
  var participants = [];
  var participantsJson = eventJson.attendees || [];
  for (var p = 0 ; p < participantsJson.length; ++p) {
    var current = participantsJson[p];
    var isComing = 0;
    if (current.responseStatus == "accepted") isComing = 1;
    else if (current.responseStatus == "needsAction") isComing = -1;isComing = 1;

    participants.push(new Participant(current.displayName, current.email, isComing));
  }
  var calEvent = new CalEvent(eventJson.summary, eventJson.description, participants, eventJson.start.dateTime, eventJson.end.dateTime, eventJson.id, id);
  return calEvent; 
};

CalendarClient.prototype.getEventDetails = function(calId, id, origCallback) {
  var oauth = this.oauth;
  var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calId + '/events/' + id;
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };
  var callback = function(resp, chr) {
    origCallback(parseEvent(JSON.parse(resp), calId));
  };
  oauth.sendSignedRequest(url, callback, request);
};


// Get Calendar details.
CalendarClient.prototype.getCalendarDetails_ = function(origCallback, id) {
  var oauth = this.oauth;
  var url = 'https://www.googleapis.com/calendar/v3/calendars/' + id + '/events';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };
  var callback = function(resp, chr) {
    var events = [];
    var jsonResp =JSON.parse(resp);
    for (var i = 0; i <jsonResp.items.length; ++i) {
      // Each event.
      var calEvent = parseEvent(jsonResp.items[i], id);
      if (calEvent) {
        events.push(calEvent);
      }
    }
    origCallback(events);
  };
  oauth.sendSignedRequest(url, callback, request);
};



// Get primary calendar id.
CalendarClient.prototype.getPrimaryCalenderId_ = function(origCallback) {
   var url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
   var request = {
     'method': 'GET',
     'parameters': {'alt': 'json', 'minAccessRole': 'owner'}
   };
   var callback = function(resp, chr) {
     var json = JSON.parse(resp);
     var calendarId = json.items[0].id;
     origCallback(calendarId);
   };
   this.oauth.sendSignedRequest(url, callback, request);
};

//////////////// GET ALL EVENTS /////////////
CalendarClient.prototype.getAllEvents = function(callback) {
  var fetchEvents = this.getCalendarDetails_.bind(this, callback); 
  this.getPrimaryCalenderId_(fetchEvents);
};
