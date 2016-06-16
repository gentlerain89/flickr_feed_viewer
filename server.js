var express = require('express');
var app = express();
var compress = require('compression');
var conf = require('./conf');
var mainPath = __dirname + "/sources";


app.use(compress());

//Static resource mapping


app.get('/bower_components/*', function (req, res) {
    res.sendFile(__dirname + req.url);
});

app.use(express.static('sources'));

//Served AngularJS main file on first request
app.get('/*', function (request, response, next) {
    response.sendFile(mainPath + '/index.html');
});

var port = process.env.PORT || conf.port;
console.log('Server ready @', port);
app.listen(port);
