angular.module('App', ['ionic','firebase','ngCordova'])
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
                templateUrl: "views/tabs.html"
            })
            .state('app.chat', {
                url: "/chat",
                views: {
                    'chat-tab': {
                        templateUrl: "views/chat/index.html",
                        controller: 'ChatsController'
                    }
                }
            })
            .state('app.posts', {
                url: "/posts",
                views: {
                    'post-tab': {
                        templateUrl: "views/posts/index.html",
                        controller: 'PostsController'
                    }
                }
            })
            .state('tabs.navstack', {
                url: "/navstack",
                views: {
                    'about-tab': {
                        templateUrl: "nav-stack.html"
                    }
                }
            })
            .state('app.contact', {
                url: "/contacts",
                views: {
                    'contact-tab': {
                        templateUrl: "views/contacts/contacts.html",
                        controller: "ContactsController"
                    }
                }
            })
            .state('app.profile', {
                url: "/profile/:id",
                views: {
                    'contact-tab': {
                        templateUrl: "views/contacts/profile.html",
                        controller: 'ContactsController'
                    }
                }
            })
            .state('app.map', {
                url: "/map",
                views: {
                    'map-tab': {
                        templateUrl: "views/map/index.html",
                        controller: "MapsController"
                    }
                }
            });

        $urlRouterProvider.otherwise("/app/map");
    });
