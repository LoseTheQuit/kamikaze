'use strict';

let fs = require('fs'),
    colors = require('colors'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    https = require('https'),
    http = require('http'),
    Twitter = require('twitter'),
    request = require('request'),
    querystring = require('querystring'),
    cookieParser = require('cookie-parser'),
    Client = require('node-rest-client').Client;

var client = new Client();

app.use(express.static('public'))
app.use(cookieParser());

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


var _ = reqiure('underscore');

function allowCrossDomain(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    var origin = req.headers.origin;
    if (_.contains(app.get('allowed_origins'), origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
}

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(allowCrossDomain);
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {

    console.log('\n');
    console.log('********************************************'.black.bgWhite);
    console.log("The frontend server is running on port 5000!".black.bgWhite);
    console.log('********************************************'.black.bgWhite);
    console.log('\n');

});

app.get('/', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    var html = fs.readFileSync('public/views/base.html');
    res.end(html);

});

app.get('/on-ramp', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    //  var html = fs.readFileSync('static/views/on-ramp.html');
    var onRamp = fs.readFileSync('http://go.nthrive.com/rs/099-EMG-811/images/nThrive-banner-001.html');
    res.end(onRamp);

});

app.get('/nThrive', function (req, res) {

    console.log('\n');
    console.log('******* INCOMING GET REQUEST - Load Template *******'.black.bgWhite);
    console.log('\n');

    var html = fs.readFileSync('public/views/on-ramp.html');
    res.end(html);

});