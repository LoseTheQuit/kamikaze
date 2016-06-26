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

//app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
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