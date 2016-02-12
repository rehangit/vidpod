'use strict';
/*
  A simple web proxy to download rss/xml files and convert 
  them to json.
  
  To star the proxy on the server: 
  
    node rss2json.js
  
  

*/

var Http = require('http');
var Https = require('https');
var Url = require('url');

function downloadRss(url, cb) {
  
  var content = '';
  var u = Url.parse(url);
  console.log('using protocol:',u.protocol);
  var h = (u.protocol==='https:' ? Https : Http);
  h.get(url, function(res) {
    res.on('data', function(data) {
      content += data;
    })
    .on('end', function(data) {
      content += data;
      cb(content);
    });
  });
}



var server = Http.createServer(function(request, response) {

  request.resume();
  request.on('error', function(err) {
    console.error(err);
  }).on('end', function() {
    // BEGINNING OF NEW STUFF
    response.on('error', function(err) {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');

    var url = Url.parse(request.url, true);
    console.log('url obj: ', url);
    if(!url || !url.query || !url.query.rss_url) {
      return response.end();
    }

    downloadRss(decodeURIComponent(url.query.rss_url), function(data) {
      if(url.pathname.toLowerCase().indexOf('json')>=0) {
        var feedparser = new (require('feedme'))(true);
        feedparser.write(data);
        response.write(JSON.stringify(feedparser.done()));
      } else {
        response.write(data);
      }
      response.end();
    });
  });
});

server.listen("8888");