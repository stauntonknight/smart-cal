var onClick = function() {
  oauth.authorize(function() {
    CalendarClient.init(oauth);
  });
};

chrome.browserAction.onClicked.addListener(onClick);
