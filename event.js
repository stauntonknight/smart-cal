var CalEvent = function(title, description, participants, startTime, endTime, eventId, calId, meetingNotesUrl) {
  this.title = title || '';
  this.description = description || '';
  this.participants = participants;
  // This is in string format as input, need to fix.
  this.startTime = startTime;
  // This is in string format as input, need to fix.
  this.endTime = endTime;

  // Event id, not filled yet.
  this.eventId = eventId;

  // Calendar id.
  this.calId = calId;
  this.meetingNotesUrl = meetingNotesUrl;
  if (!this.meetingNotesUrl) {
    var magicString = '**Meeting notes setup by SmartMeet**';
    var index = this.description.indexOf(magicString);
    if (index != -1) {
      this.meetingNotesUrl = this.description.substr(index + magicString.length + 1);
      this.description = this.description.substr(0, index - 1);
    }
  }
};
