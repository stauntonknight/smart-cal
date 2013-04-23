var backgroundPage = chrome.extension.getBackgroundPage();
var cc = CalendarClient;
cc.init(backgroundPage.oauth);
cc.instance.getAllEvents();
