var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('failed to read file', data);
    } else {
      console.log('able to read file', data);
      cb(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(urlRequested, cb) {
  return exports.readListOfUrls( function(list) {
    cb(list.indexOf(urlRequested) !== -1);
  });
};

exports.addUrlToList = function(urlToAdd, cb) {
  if (!exports.isUrlInList(urlToAdd, cb)) {
    fs.writeFile(exports.paths.list, urlToAdd + '\n', function(err) {
      if (err) {
        console.log('failed to write file', err);
      } else {
        console.log('success to write file');
      }
    });
  }
};

exports.isUrlArchived = function(urlToCheck, cb) {
  fs.readFile(exports.paths.archivedSites + '/' + urlToCheck, 'utf8', (err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function() {
};
