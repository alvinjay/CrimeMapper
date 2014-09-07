/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('MapsController', function($scope, IonicPopupService, IonicLoadingService, $cordovaDialogs, $cordovaGeolocation, $cordovaNetwork, $cordovaSms, $cordovaContacts){

            $scope.data = {
                nullNumber: true
            };

            $scope.deviceready = false;

            $scope.sms = {};

            $scope.contact = {};

            // begin watching
            var watch = $cordovaGeolocation.watchPosition({ frequency: 10000 });
            watch.promise.then(function() { /* Not  used */ },
                function(err) {
                    // An error occurred.
                },
                function(position) {
                    var str = 'Latitude: '  + position.coords.latitude  + '<br/>' +
                        ' Longitude: ' + position.coords.longitude + '<br />' +
                        ' Altitude: ' + position.coords.altitude + '<br />' +
                        ' Heading: ' + position.coords.heading + '<br />' +
                        ' Speed: ' + position.coords.speed + '<br />' +
                        ' Timestamp: ' + new Date(position.timestamp);
//                    $('#geolocation').html(str);
                    $scope.sms.message = str;
                });

            // clear watch
            $cordovaGeolocation.clearWatch(watch.watchID)

            document.addEventListener("deviceready", onDeviceReady, false);

            function onDeviceReady() {
                // Now safe to use device APIs
                // access multiple numbers in a string like: '0612345678,0687654321'

                $scope.deviceready = true;

                var type = $cordovaNetwork.getNetwork();
                var isOnline = $cordovaNetwork.isOnline();
                var isOffline = $cordovaNetwork.isOffline();

//                $cordovaDialogs.alert(isOnline);
            }

            $scope.pickContact = function(){
                $scope.contact.options = new ContactFindOptions();

//                    $scope.contact.options.filter   = "Alvin";
//                    $scope.contact.options.multiple = true;
//                    $scope.contact.options.desiredFields = [navigator.contacts.fieldType.id];
//
//                    function onSuccess(contacts) {
//                        $scope.contacts = contacts;
//                        console.log(contacts.length);
//                    };
//
//                    function onError(contactError) {
//                        console.log('error');
//                    };
//
//                    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
//                    navigator.contacts.find(fields, onSuccess, onError, $scope.contact.options);

                if (! $scope.deviceready) {
                    IonicPopupService.showAlert('Cordova Status', $scope.deviceready.toString());
                }
                else {
                    IonicLoadingService.show('Loading contacts...');
                    var promise = $cordovaContacts.pickContact();
                    IonicLoadingService.hide();

                    promise.then(function(contact) {
                        $scope.sms.number = contact.phoneNumbers[0].value;
                        console.log(JSON.stringify(contact));
                        $scope.data.nullNumber = false;
                    }, function(reason) {
                        console.log('fail');
                    }, null);
                }
            }

            $scope.sendSMS = function() {
                if (! $scope.deviceready) {
                    IonicPopupService.showAlert('Cordova Status', $scope.deviceready.toString());
                }
                else {
                    var promise = $cordovaSms.send($scope.sms.number,$scope.sms.message, null);
                    IonicLoadingService.show('Sending message...');

                    promise.then(function(res) {
                        console.log(JSON.stringify(res));
                        IonicLoadingService.hide();
                    }, function(err) {
                        console.log(JSON.stringify(err));
                        IonicLoadingService.hide();
                    }, null);
                }
            }

            $scope.checkNumber = function(){
                if (! $scope.sms.number || $scope.sms.number === '') {
                    $scope.data.nullNumber = true;
                }
                else {
                    $scope.data.nullNumber = false;
                }
                console.log($scope.data.nullNumber);
            }
        });
})(window.angular);