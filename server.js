'use strict';

var statusCodes = require('./status-codes.js');
var app = require('express')();
app.use(app.router);

var re = new RegExp('^\/(' + Object.keys(statusCodes).join('|') + ')$');
app.get(re, function(req, res) {
    var status = req.params[0];
    res.send(status, statusCodes[status]);
});

app.listen(process.env.PORT || 5000, console.log('This is a small echo server for testing HTTP status codes. E.g.:\n\tGET /404 returns HTTP status 404 and message Not Found\n\tGET /415 returns HTTP status 415 and message Unsupported Media Type\n'));
