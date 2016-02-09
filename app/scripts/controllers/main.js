'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
  .controller('MainCtrl', function ($http) {
    var main = this;
    var video = document.querySelector('video');


    main.feeddata = ["Maaria", "is", "a", "naughty", "girl"];
    main.selectionChanged = function (item) {
      video.src = item.src;
      video.play();
      console.log(item);
      main.selected = item;
    }


    main.initialize = function (rss, srckey) {

      $http({
        method: 'GET',
        url: 'http://rss2json.com/api.json?rss_url=' + encodeURI(rss)
      }).success(function (data) {
        // With the data succesfully returned, call our callback
        console.log(data);
        main.feeddata = data.items.map(function (item) {
          var srcval = item[srckey];
          if(typeof srckey === "function") {
            srcval = srckey(item);
          }

          return {
            title: item.title,
            src: srcval
          };
        });
      }).error(function () {
        alert("error");
      });
    }

//    main.initialize("http://rss.cnn.com/services/podcasting/studentnews/rss.xml", "guid");
    main.initialize("http://feed.cnet.com/feed/podcast/apple-byte.xml", "link");
//    main.initialize("http://www.nasa.gov/rss/dyn/NASAcast_vodcast.rss", function(item) {
//      return item.enclosure && item.enclosure.link;
//    });

  })
;
