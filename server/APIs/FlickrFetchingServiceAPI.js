/**
	API handler for FlickrFetchingService
	Responsibility for:
	+ Extracting the request params before passing to service
	+ Parsing/Transforming the responsed data
**/
var FlickrFetchingService = require("../services/FlickrFetchingService");

FlickrFetchingServiceAPI = {

	getPublicFeeds : function(req, res, next) {
		var tags = null;

		if(!req.params.tags || req.params.tags == -1) tags = [];
		else tags = req.params.tags;

		FlickrFetchingService.getPublicFeeds(tags, function(err, data){
			var jData = null;
			var returnedFeeds = [];
			var feedItem = null;
			if(!err && data) {
				//Remove the redundant string (in json) returned from Flickr
				data = data.replace("jsonFlickrFeed(", "").replace("})", "}").replace(/\'/gi, "\\\'");
				try {
					//Transform data
					jData = JSON.parse(data);
					for (var i = 0 ; i < jData.items.length; i++) {
						feedItem = jData.items[i];
						returnedFeeds.push({
							'source': feedItem.media.m,
							'name': feedItem.title,
							'tags': feedItem.tags
						});
					}
					res.end(JSON.stringify({
						'status': 200,
						'feeds': returnedFeeds
					}));
				} catch (exp) {
					console.log("Error parsing data:" + exp);
					res.end(JSON.stringify({
						'status' : 500, //Internal error
						'error' : "Internal Server Error",
						'feeds' : []
					}));
				}
			}
		});
	}
}

module.exports = FlickrFetchingServiceAPI;