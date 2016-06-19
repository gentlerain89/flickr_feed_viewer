/**
	Service that comsumes the Flickr API to get/filter public feeds
**/

var GeneralService = require('./GeneralService');
var conf = require('../../conf');


var FlickrFetchingService = {
	

	getPublicFeeds : function(tags, next) {
		
		var options = {
		  host: conf.flickr_url_endpoint_host,
		  path: conf.flickr_url_endpoint_path
		};

		if(tags) {
			options.path += "?format=json&tags=" + encodeURI(tags) + "&tagmode=ANY";
		} else {
			options.path += "?format=json";
		}
		
		GeneralService.get(options, next);
	}
}

module.exports = FlickrFetchingService;