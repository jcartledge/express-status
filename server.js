'use strict';

var statusCodes = require('./status-codes.js');
var app = require('express')();

app.use(app.router);
app.use(function(err, req, res, next) {
    if(!err) {
        return next();
    }
    res.send(err.status, err.message);
});

var re = new RegExp('^\/(' + Object.keys(statusCodes).join('|') + ')$');
app.get(re, function(req) {
    var status = req.params[0];
    var err = new Error(statusCodes[status]);
    err.status = status;
    throw err;
});

app.listen(process.env.PORT || 5000, console.log('This is a small echo server for testing HTTP status codes. E.g.:\n\tGET /404 returns HTTP status 404 and message Not Found\n\tGET /415 returns HTTP status 415 and message Unsupported Media Type\n'));
