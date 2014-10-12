
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers' ,'ui.router', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
   

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })

     .state('app.favorites', {
      url: "/favorites",
      views: {
        'menuContent' :{
          templateUrl: "templates/favorites.html"
          
        }
      }
    })
    .state('app.about_us', {
      url: "/about_us",
      views: {
        'menuContent' :{
          templateUrl: "templates/about_us.html"
        }
      }
    })
    
    .state('app.feedback', {
      url: "/feedback",
      views: {
        'menuContent' :{
          templateUrl: "templates/feedback.html"
        }
      }
    })
    
    .state('app.collections', {
      url: "/collections",
      views: {
        'menuContent' :{
          templateUrl: "templates/collections.html",
          controller: 'CollectionsCtrl'
        }
      }
    })
    .state('app.collection-details', {
      url: '/collection/:collectionId',
      views: {
        'menuContent': {
          templateUrl: 'templates/collection-details.html',
          controller: 'CollectionDetailCtrl'
        }
      }
    })
    
    .state('app.item-details', {
      url: '/item/:itemId',
      views: {
        'menuContent': {
          templateUrl: 'templates/item-details.html',
          controller: 'ItemDetailCtrl'
        }
      }
    })
    
    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html"
          
        }
      }
    })
    
    .state('app.latest', {
      url: '/latest',
      views: {
        'menuContent': {
          templateUrl: 'templates/latest.html',
          controller: 'latestCtrl'
        }
      }
    });


    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

