var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : '803072526277.apps.googleusercontent.com',
  'consumer_secret' : 'rlP7o9KNtUCfAXmApZa6DQOZ',
  'scope' : 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.google.com/calendar/feeds',
  'app_name' : 'easy-meets'
});

var getCalendarDetails = function(id) {
  var url = 'https://www.googleapis.com/calendar/v3/calendars/' + id + '/events';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'}
  };
  var callback = function(resp, chr) {
    var events = [];
    for (var i = 0; i <resp.items.length; ++i) {
      var eventJson = resp.items[i];
      var participants = [];
      var participantsJson = eventsJson.attendees;
      for (var p = 0 ; p < participantsJson.length; ++p) {
        var current = participantsJson[p];
        var isComing = 0;
        if (current.responseStatus == "accepted") isComing = 1;
        else if (current.responseStatus == "needsAction") isComing = -1;isComing = 1;

        participants.push(new Participant(current.displayName, current.email, isComing));
      }
    }
    var calEvent = new Event(eventJson.summary, eventJson.description, participants, eventJson.start.dateTime, eventJson.end.dateTime);
    events.push(calEvent);
    UI.render(events);
  };
  oauth.sendSignedRequest(url, callback, request);
};

var onAuthorize = function() {
   var url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
   var request = {
     'method': 'GET',
     'parameters': {'alt': 'json', 'minAccessRole': 'owner'}
   };
   var callback = function(resp, chr) {
     var json = JSON.parse(resp);
     var calendarId = json.items[0].id;
     getCalendarDetails(calendarId);
   };
   oauth.sendSignedRequest(url, callback, request);
};

var onClick = function() {
  oauth.authorize(function() {
    onAuthorize();
  });
};

chrome.browserAction.onClicked.addListener(onClick);
