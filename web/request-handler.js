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
    if (archive.isUrlInList(req.url.slice(1))) {
      
    }
    // console.log(path.join(__dirname, '../archives/sites') + req.url);
    var fsDirectory = archive.archivedSites + req.url || '/public/index.html';
    fs.readFile(path.join(__dirname, fsDirectory), 'utf8', (err, data) => {
      res.writeHead(statusCode, headers);
      res.end(JSON.stringify(data));
      
    });
    // console.log('get request', archive.paths.list)
    // res.end( archive.paths.list);
  }
  
};
