var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express');

var keyfile = fs.readFileSync('ssl/privkey.pem', 'utf8');
var certfile = fs.readFileSync('ssl/cert.pem', 'utf8');
var credentials = {key: keyfile, cert: certfile};

var app = express();
app.use(express.static(__dirname + '/public'));
app.enable('trust proxy');
app.all('*', function(req, res, next) {
    if (req.secure) {
	return next();
    }
    res.redirect('https://' + req.hostname + req.url);
});

app.get('/*', function(req, res) {
    res.type('text/html');
    res.sendFile(__dirname + '/public/main/index.html');
    res.status('200');
});

var httpsServer = https.createServer(credentials, app).listen(443, function() {
    console.log("Express server listening on port " + 443);
});

app.listen(80);
