var oauth = chrome.extension.getBackgroundPage().ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : '803072526277.apps.googleusercontent.com',
  'consumer_secret' : 'rlP7o9KNtUCfAXmApZa6DQOZ',
  'scope' : 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.google.com/calendar/feeds',
  'app_name' : 'easy-meets'
});

oauth.authorize(function() {
	var cc = CalendarClient;
	cc.init(oauth);
	cc.instance.getAllEvents();
});
