/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('ContactsController', function($scope, $stateParams, $ionicScrollDelegate, $ionicLoading, $timeout, $ionicModal, $firebase, IonicLoadingService, FirebaseService){
            //data flags
            $scope.data = {
                showSearch: false,
                showNewMessage: false,
                connected: false
            };

            //executes after view is loaded
            $scope.$on('$viewContentLoaded', function(){
                //checks connection
                if ($scope.data.connected)
                {
                    //shows loading modal
                    IonicLoadingService.show();
                }

            });

            /* Connection */
            var connectionRef = FirebaseService.getConnection();
            $scope.data.connected = $firebase(connectionRef);
//
            /* Contacts */
            var contactsRef = FirebaseService.getRef('/contacts');
            $scope.contacts = FirebaseService.getArray(contactsRef);


            $scope.contact = {
                name: 'Lebron'
            };


//            console.log($scope.data.connected);

            $scope.contacts.$watch(function(){
            });

            $scope.contacts.$loaded(function(){
                console.log($scope.contacts);
                IonicLoadingService.hide();
            });

            /* retrieve contact with id given in $stateParams */
            if($stateParams.id)
            {
                $scope.contact =  $.grep($scope.contacts, function(e){ return e.id == $stateParams.id; })[0];
                console.log($scope.contact);
            }



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

            $ionicModal.fromTemplateUrl('views/contacts/modal/add.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            $scope.openModal = function() {
                $scope.modal.show();
            };
            $scope.closeModal = function() {
                $scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function() {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                // Execute action
            });
            // Submit contact
            $scope.submit = function(){
                if(! $scope.contact.name || ! $scope.contact.email) {
                    console.log('incomplete');
                }
                else
                {
                    //insert new post
                    $scope.contacts.$add($scope.contact).then(function(newContact){
                        console.log($scope.contacts);
                        console.log(newContact.name());
                    });
                    //close modal
                    $scope.closeModal();
                    //empty post object
                    $scope.contact = {};

                }
            }

            //Remove Contact
            $scope.remove = function(id){
                $scope.contacts.$remove($scope.contacts.$indexFor(id));
            }
     });
})(window.angular);