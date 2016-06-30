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
        console.log(JSON.stringify(data));
        res.writeHead(statusCode, headers);
        res.end(JSON.stringify(data));
      });
    } else {
      statusCode = 404;
      res.writeHead(statusCode, headers);
      res.end();
    }
  }
};