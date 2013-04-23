var CalEvent = function(title, description, participants, startTime, endTime, eventId) {
  this.title = title;
  this.description = description;
  this.participants = participants;
  // This is in string format as input, need to fix.
  this.startTime = startTime;
  // This is in string format as input, need to fix.
  this.endTime = endTime;

  // Event id, not filled yet.
  this.eventId = eventId;
};
