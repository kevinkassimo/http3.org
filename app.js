var https = require('https');
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/*', function(req, res) {
    res.type('text/html');
    res.sendFile('main/index.html');
    res.status('200');
});

app.listen(80);
