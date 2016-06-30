var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

var headers = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var statusCode = 200;

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url.length === 1) {
      fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', (err, data) => {
        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(data));
      });
    } else if (archive.isUrlInList(req.url.slice(1))) {
      fs.readFile(archive.paths.archivedSites + req.url, 'utf8', (err, data) => {
        if (err) { 
          console.log('failed to readFile from req.handler');
        } else {
          console.log(JSON.stringify(data));
          res.writeHead(statusCode, headers);
          res.end(JSON.stringify(data));
        }
      });
    } else {
      console.log('we are in the end else function');
      statusCode = 404;
      res.writeHead(statusCode, headers);
      res.end();
    }
  }


  if (req.method === 'POST') {
    var data = '';

    req.on('data', function (chunk) {
      data += chunk;
    });

    req.on('end', function() {
      archive.addUrlToList(data.slice(4));
      statusCode = 302;
      res.writeHead(statusCode, headers);
      res.end();
    });
    // archive.addUrlToList(req.url.slice(1));
  }
};