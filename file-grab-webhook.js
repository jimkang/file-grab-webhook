var config = require('./config/config');
var http = require('http');
var fs = require('fs');
var request = require('request');

console.log('The file-grab-webhook server is running.');

function takeRequest(req, res) {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end('OK');
  }
  else if (req.method === 'POST') {
    var body = '';

    req.on('data', function (data) {
      body += data;
    });

    req.on('end', function doneReadingData() {
      respondToRequestWithBody(req, body, res, headers);
    });
  }
  else {
    res.writeHead(304, headers);
    res.end();
  }
}

function respondToRequestWithBody(req, body, res, headers) {
  headers['Content-Type'] = 'text/json';

  debugger;
  // var ghPayload = JSON.parse(body);
  var fileWriteStream = fs.createWriteStream(config.fileDest);
  fileWriteStream.on('error', reportError);

  request
    .get(config.fileURL)
    .on('error', respondToReqError)
    .on('end', writeResponse)
    .pipe(fileWriteStream);

  function writeResponse() {
    debugger;
    res.writeHead(200, headers);
    res.end();
  }

  function respondToReqError(error) {
    debugger;
    fileWriteStream.end();
    reportError(error);
  }

  function reportError(error) {
    debugger;
    console.log(error);
    res.writeHead(500, headers);
    res.end();
  }
}


http.createServer(takeRequest).listen(config.port);

console.log('Webhook server listening at port:', config.port);
