angular.module('App', ['ionic','firebase','ngCordova'])
    .run(function($ionicPlatform,$window, $rootScope) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.hide();
            }
        });

        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function() {
                $rootScope.online = false;
            });
        }, false);

        $window.addEventListener("online", function () {
            $rootScope.$apply(function() {
                $rootScope.online = true;
            });
        }, false);
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "views/tabs.html"
            })
            .state('app.map', {
                url: "/map",
                views: {
                    'map-tab': {
                        templateUrl: "views/map/index.html",
                        controller: "MapsController"
                    }
                }
            })
            .state('app.settings', {
                url: "/settings",
                views: {
                    'settings-tab': {
                        templateUrl: "views/settings/index.html",
                        controller: "SettingController"
                    }
                }
            });

        $urlRouterProvider.otherwise("/app/map");
    });
