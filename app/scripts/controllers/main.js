'use strict';

/**
 * @ngdoc function
 * @name vidpodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vidpodApp
 */
angular.module('vidpodApp')
  .controller('MainCtrl', function ($http, $scope, $sanitize) {
    var main = this;
    var video = document.querySelector('video');

    // supported feeds
    main.rssfeeds = [
      {
        title: 'CNN Student News',
        rss: 'http://rss.cnn.com/services/podcasting/studentnews/rss.xml'
      },
      {
        title: 'Apple Byte',
        rss: 'http://feed.cnet.com/feed/podcast/apple-byte.xml'
      },
      {
        title: 'NASACast video cast',
        rss: 'http://www.nasa.gov/rss/dyn/NASAcast_vodcast.rss'
       },
      {
        title: 'TED Talks',
        rss: 'https://www.ted.com/talks/rss'
      }
    ];

    main.feeddata = [];
    main.feedheader = null;


    // Handle click / selection changed event
    main.selectionChanged = function (item) {
      video.src = item.enclosure.link||item.enclosure.url;
      video.type = item.enclosure.type;
      video.play();

      $('html, body').animate({
        scrollTop: $('#feed-video-panel').offset().top
      }, 1000);

      main.selected = item;
    };

    main.thumbUrl = function (item) {
      var thumb = item.thumbnail || 
                  item['media:thumbnail'] && item['media:thumbnail'].url ||
                  item['itunes:image'] && item['itunes:image'].href ||
                  main.feedheader.image;
      return thumb;
      
    }
  
    // Initialise the video feeds
    main.initialize = function (index) {
      var rss = main.rssfeeds[index];

      $http({
        method: 'GET',
        url: 'http://localhost:8888/rss2json?rss_url=' + encodeURI(rss.rss)
      }).success(function (data) {
        
        rss.title = data.title;
        console.log(data);
        main.feedheader = {
          title: data.title,
          description: data.description,
          pubDate: data.pubDate || data.pubdate,
          image: data.image && data.image.url || data['itunes:image'] && data['itunes:image'].href || data.image
        };
        main.feeddata = data.items;
      }).error(function (err) {
        window.alert('error:',err);
      });

    };

    var selectedFeedIndex = Math.floor(Math.random()*main.rssfeeds.length);
    console.log('Selecting random feed:', selectedFeedIndex, main.rssfeeds[selectedFeedIndex]);
    main.initialize(selectedFeedIndex);
  })
;
