'use strict';

/* App Module */

var docsHandApp = angular.module('docsHandApp', [
  'ngRoute',
  'docsHandControllers'
  
]);

docsHandApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/films', {
        templateUrl: 'partials/film-list.html',
        controller: 'FilmListCtrl'
      }).
      when('/twitter', {
        templateUrl: 'partials/twitter.html',
        controller: 'FilmListCtrl'
      }).
      when('/filmSelect', {
        templateUrl: 'partials/filmSelect.html',
        controller: 'FilmListCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'FilmListCtrl'
      }).
      when('/help', {
        templateUrl: 'partials/help.html',
        controller: 'FilmListCtrl'
      }).
// Should consider setting film home to current URL so that it goes back to the most recent page - that or have help and about come up in modals
      otherwise({
        redirectTo: '/films'
      });
  }]);
