'use strict';

/**
 * @ngdoc overview
 * @name vidpodApp
 * @description
 * # vidpodApp
 *
 * Main module of the application.
 */
angular
  .module('vidpodApp', ['ngRoute', 'ngAria', 'ngSanitize'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
