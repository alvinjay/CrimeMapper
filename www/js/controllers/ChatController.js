/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('ChatsController', function($scope, $stateParams, $ionicScrollDelegate, $timeout, $ionicLoading){
            $scope.data = {};
            $scope.data.showSearch = true;
            $scope.data.showLoading = true;
            $scope.data.showNewMessage = false;

            /* Firebase Refs*/
            var rootRef = new Firebase("https://dazzling-torch-3530.firebaseio.com/");
            var contactsRef = rootRef.child('contacts');

            $ionicLoading.show({
                template: 'Loading Data...',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 500
            });

            contactsRef.on('value', function(snapshot){
                $ionicLoading.hide();
            });

            contactsRef.on('child_added', function(snapshot){
                $timeout(function(){
                    $scope.contacts.push(snapshot.val());
                }, 100)
            });

            contactsRef.on('child_removed', function(snapshot){
                $timeout(function(){
                    $scope.contacts.forEach(function(contact){
                        if (snapshot.val().id == contact.id)
                        {
                            console.log($scope.contacts.indexOf(contact));
                            $scope.contacts.splice($scope.contacts.indexOf(contact), 1);
                        }
                    });
                    console.log($scope.contacts);
                }, 10)
            });

            $scope.contact = {};
            $scope.contacts = [];

            /* retrieve contact with id given in $stateParams */
            if($stateParams.id)
            {
                $scope.contact =  $.grep($scope.contacts, function(e){ return e.id == $stateParams.id; })[0];
                console.log($scope.contact);
            }

            $scope.$on('$viewContentLoaded', function(){
                if($scope.contacts.length === 0)
                {
                    $scope.data.showSearch = false;
                }
            });

            $scope.moveItem = function(item, fromIndex, toIndex) {
                $scope.contacts.splice(fromIndex, 1);
                $scope.contacts.splice(toIndex, 0, item);
            };

            $scope.onItemDelete = function($index) {
                if($scope.contacts.length == 1) {
                    $scope.contacts = [];
                }
                else
                {
                    $scope.contacts.splice($index, 1);
                }
                console.log($scope.contacts);
            }

            $scope.toggleSearch = function(){
                $scope.data.showSearch = ! $scope.data.showSearch;
                console.log($scope.data.showSearch);
                if ($scope.data.showSearch)
                {
                    $('#searchBox').focus();
                }
            }
            //reset ion-content start-y
            $scope.resetScroll = function(){
                $ionicScrollDelegate.scrollTo(0,50,true);
            }
        });
})(window.angular);