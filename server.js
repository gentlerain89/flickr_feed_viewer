var express = require('express');
var app = express();
var compress = require('compression');
var conf = require('./conf');
var mainPath = __dirname + "/dist";
var FlickrFetchingServiceAPI = require("./server/APIs/FlickrFetchingServiceAPI");

app.use(compress());


app.get('/bower_components/*', function (req, res) {
    res.sendFile(__dirname + req.url);
});

app.get('/api/feeds/:tags', FlickrFetchingServiceAPI.getPublicFeeds);

//Static resource mapping
app.use(express.static('dist'));

//Served AngularJS main file on first request
app.get('/*', function (request, response, next) {
    response.sendFile(mainPath + '/index.html');
});

var port = process.env.PORT || conf.port;
console.log('Server ready @', port);
app.listen(port);