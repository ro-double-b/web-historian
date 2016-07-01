// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

var totalUrls = [];
var notArchivedUrls = [];

var makeToArchiveList = () => {
  totalUrls.forEach(function(url) {
    archive.isUrlArchived(url, _.identity, (urlNotArch) => {
      notArchivedUrls.push(urlNotArch);
      archive.downloadUrls(notArchivedUrls);
    });
  });
  
};

archive.readListOfUrls((list) => {
  totalUrls = list;
}, makeToArchiveList);