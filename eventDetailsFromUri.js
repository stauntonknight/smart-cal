	function getUrlVars() {
	    var vars = {};
	    var parts = document.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}
	var meetingTitle = getUrlVars()["title"];
	var meetingId = getUrlVars()["id"];