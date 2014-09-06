/* global Firebase */
(function(angular){
    angular.module('App')
        .service('IonicLoadingService', function($ionicLoading){
            return{
                show: function showLoading(){
                    $ionicLoading.show({
                        template: 'Loading Data...',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 500
                    });
                },
                hide: function hideLoading(){
                    $ionicLoading.hide();
                }
         }
    });
})(window.angular);