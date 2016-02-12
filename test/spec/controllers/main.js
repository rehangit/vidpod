'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('vidpodApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of rssfeeds to the scope', function () {
    expect(MainCtrl.rssfeeds.length>=4).toBeTruthy();
  });
  it('should attach a list of feedheader to the scope', function () {
    expect(MainCtrl.feedheader).toBe(null);
  });
  it('should attach a list of feeddata to the scope', function () {
    expect(MainCtrl.feeddata.length).toBe(0);
  });
});
