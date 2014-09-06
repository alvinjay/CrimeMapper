/* global Firebase */
(function(angular){
    angular.module('App')
        .service('FirebaseService', function($firebase){
            var FIREBASE_URL = 'https://dazzling-torch-3530.firebaseio.com';
            var CONNECTION_URL = FIREBASE_URL + '/.info/connected';
            return{
                getRef: function getRef(endpoint){
                    return new Firebase(FIREBASE_URL + endpoint);
                },
                getObject: function getObject(ref)
                {
                    return $firebase(ref).$asObject();
                },
                getArray: function getArray(ref)
                {
                    return $firebase(ref).$asArray();
                },
                getConnection: function getConnection(){
                    return new Firebase(CONNECTION_URL);
                }
            }
        });
})(window.angular);