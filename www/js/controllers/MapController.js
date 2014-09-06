/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('MapsController', function($scope, IonicPopupService, $cordovaGeolocation, $cordovaSocialSharing){

            $scope.sms = {};

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

            // access multiple numbers in a string like: '0612345678,0687654321'
            $cordovaSocialSharing
                .shareViaSMS($scope.sms.message, $scope.sms.number)
                .then(function(result) {
                    // Success!
                    IonicPopupService('success', result);
                }, function(err) {
                    // An error occured. Show a message to the user
                    IonicPopupService('fail', err);
                });
            $(document).ready(
//                $scope.sendSMS = function(){
//                  window.plugins.socialsharing.shareViaSMS("message", "+639232730101", function(){alert("ok")}, function(e){alert("error: " + e)});
//                }
                console.log(window)
            );

        });
})(window.angular);