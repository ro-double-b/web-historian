var fs = require('fs');
var path = require('path');
var _ = require('underscore');
//test
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb2) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      console.log('failed to read file', data, err);
    } else {
      console.log('able to read file', data);
      cb2(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(urlRequested, cb1, failed) {
  return exports.readListOfUrls( function(list) {
    if (list.indexOf(urlRequested) !== -1) {
      cb1();
    } else {
      failed();
      return false;
    }
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
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function(urlList) {
  urlList.forEach(function(item) {
    fs.writeFile(exports.paths.archivedSites + '/' + item, 'hi', function(err) {
      if (err) {
        console.log('unable to write');
      } else {
        console.log('wrote successfully');
      }
    });
  });
};
