'use strict';

/**
 * @ngdoc overview
 * @name accedoApp
 * @description
 * # accedoApp
 *
 * Main module of the application.
 */
angular
  .module('accedoApp', ['ngRoute', 'ngAria', 'ngSanitize'])
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
