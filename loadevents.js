document.addEventListener('DOMContentLoaded', function () {
  console.log('hello world');
  var bg = chrome.extension.getBackgroundPage();
  DocsClient.init(bg.oauth);
  CalendarClient.init(bg.oauth);
  bg.oauth.authorize(function() {
    CalendarClient.instance.getAllEvents(UI.render);
  });
});
