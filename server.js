var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');

var https = require('https');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post("/post", function(req, res) {

    console.log(req.body.body.length);
    var options = {
        host: 'localhost',
        port: '8080',
        path: req.body.destination,
        rejectUnauthorized: false,
        method: 'POST',
        headers: {
            "Content-Type":"application/json",
            "Content-Length":"" + req.body.body.length
        }
    };

    var request = https.request(options, (response) => {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        var str = '';
        response.on('data', (d) => {
            str += d;
        });
        response.on('end', () => {
            console.log(str);
            res.send(str);
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.write(req.body.body);
    request.end();
});

app.post("/put", function(req, res) {

    console.log(req.body.body.length);
    var options = {
        host: 'localhost',
        port: '8080',
        path: req.body.destination,
        rejectUnauthorized: false,
        method: 'PUT',
        headers: {
            "Content-Type":"application/json",
            "Content-Length":"" + req.body.body.length
        }
    };

    var request = https.request(options, (response) => {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        var str = '';
        response.on('data', (d) => {
            str += d;
        });
        response.on('end', () => {
            console.log(str);
            res.send(str);
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.write(req.body.body);
    request.end();
});

app.post("/delete", function(req, res) {

    console.log("delete");
    var options = {
        host: 'localhost',
        port: '8080',
        path: req.body.destination,
        rejectUnauthorized: false,
        method: 'DELETE',
        headers: {
            "Content-Type":"application/json"
        }
    };

    var request = https.request(options, (response) => {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        var str = '';
        response.on('data', (d) => {
            str += d;
        });
        response.on('end', () => {
            console.log(str);
            res.send(str);
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });

    request.end();
});

app.get('/get', function(req, res) {

    console.log("got to endpoint");

    var options = {
        host: 'localhost',
        port: '8080',
        path: '/',
        rejectUnauthorized: false
    };

    var request = https.request(options, (response) => {
        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        var str = '';
        response.on('data', (d) => {
            str += d;
        });
        response.on('end', () => {
            console.log(str);
            res.send(str);
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})
