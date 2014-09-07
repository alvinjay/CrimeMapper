/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('MapsController', function($scope, IonicPopupService, $cordovaDialogs, $cordovaGeolocation, $cordovaNetwork, $cordovaSms){

            $scope.deviceready = false;

            $scope.sms = {
                message: 'whatup',
                number: '639232730101'
            };

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
                    $('#geolocation').html(str);
                    // Active updates of the position here
                    // position.coords.[ latitude / longitude]
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

            $scope.sendSMS = function() {

                if (! $scope.deviceready) {
                    IonicPopupService.showAlert('Cordova Status', $scope.deviceready.toString());
                }
                else {
//                    $cordovaSocialSharing
//                        .shareViaSMS($scope.sms.message, $scope.sms.number)
//                        .then(function(result) {
//                            // Success!
//                            IonicPopupService.showAlert('success', result);
//                        }, function(err) {
//                            // An error occured. Show a message to the user
//                            IonicPopupService.showAlert('fail', err);
//                        });
                    var res = $cordovaSms.send('+639232730101','whatup', null);
                    console.log(res);
                }
            }
        });
})(window.angular);