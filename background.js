var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url' : 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url' : 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url' : 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key' : '803072526277.apps.googleusercontent.com',
  'consumer_secret' : 'rlP7o9KNtUCfAXmApZa6DQOZ',
  'scope' : 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.google.com/calendar/feeds https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  'app_name' : 'easy-meets'
});

var fetchEvents = function(callback) {
};

DocsClient.init(oauth);


chrome.extension.onMessage.addListener(
    function(request, sender, callback) {
        switch (request.directive) {
        case "popup-opened":
          fetchEvents();
        default:
          // helps debug when request directive doesn't match
          console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);
