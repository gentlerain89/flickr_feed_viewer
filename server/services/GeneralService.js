/**
	Service that wrap basic task: GET, POST, PUT, DELETE
**/
var http = require("http");

var generalService = {

	/**
	   Do the GET request
	   params: 
	       + "option" should have the format {host:..., part: ...}
	       + next(err,data): a callback that will receive data (and error if any)
	**/
	get: function(options, next) {
		http.get(options, function(res) {
	  
	        res.setEncoding('utf8');

	        var body = '';
	        res.on('data', function(d) {
	            body += d;
	        });
	  
	        res.on('end', function() {
	            //Passed data to outside and let the caller progress it (parse, transform, etc)
	            next(null, body);
	        });
	    }).on('error', function(err) {
	        // handle errors with the request itself
	        console.error('Error with the request:', err.message);
	        next(err, null);
		});		
	}
	//Other methods will be written when needed
};

module.exports = generalService;
