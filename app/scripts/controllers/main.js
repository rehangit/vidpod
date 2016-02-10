'use strict';

/**
 * @ngdoc function
 * @name accedoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accedoApp
 */
angular.module('accedoApp')
  .controller('MainCtrl', function ($http, $scope, $sanitize) {
    var main = this;
    var video = document.querySelector('video');

    // supported feeds
    main.rssfeeds = [
      {
        title: "CNN Student News",
        rss: "http://rss.cnn.com/services/podcasting/studentnews/rss.xml"
      },
      {
        title: "Apple Byte",
        rss: "http://feed.cnet.com/feed/podcast/apple-byte.xml"
      },
      {
        title: "NASACast video cast",
        rss: "http://www.nasa.gov/rss/dyn/NASAcast_vodcast.rss"
       },
      {
        title: "TED Talks",
        rss: "https://www.ted.com/talks/rss"
      }
    ];

    main.feeddata = [];
    main.feedheader = null;


    // Handle click / selection changed event
    main.selectionChanged = function (item) {
      video.src = item.enclosure.link;
      video.type = item.enclosure.type;
      video.play();

      $('html, body').animate({
        scrollTop: $("#feed-video-panel").offset().top
      }, 1000);

      console.log(item);
      main.selected = item;
    }

    // Initialise the video feeds
    main.initialize = function (index) {
      var rss = main.rssfeeds[index];
      $http({
        method: 'GET',
        url: 'http://rss2json.com/api.json?rss_url=' + encodeURI(rss.rss)
      }).success(function (data) {
        rss.title = data.title;
        console.log(data);
        main.feedheader = data.feed;
        main.feeddata = data.items;
      }).error(function () {
        alert("error");
      });

    }

    var selectedFeedIndex = Math.floor(Math.random()*main.rssfeeds.length);
    console.log("Selecting random feed:", selectedFeedIndex, main.rssfeeds[selectedFeedIndex])
    main.initialize(selectedFeedIndex);
  })
;
