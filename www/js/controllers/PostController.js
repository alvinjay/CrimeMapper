/* global Firebase */
(function(angular){
    angular.module('App')
        .controller('PostsController', function($scope, $routeParams, $ionicModal, $ionicScrollDelegate, $ionicPopup){
            $scope.$on('$destroy', function(){
                $ionicScrollDelegate.forgetScrollPosition();
            })

            $scope.data = {};
            $scope.data.showSearch = false;

            //post object
            $scope.post = {
                title: null,
                content: null,
                author: {
                    name: null
                },
                date_posted: null
            };

            //posts array
            $scope.posts = [
                {
                    title: 'First Post',
                    content: "Advenas sunt aususs de fidelis mineralis.Vitas volare!Volare absolute ducunt ad peritus diatria.Advenas resistere in talis rugensis civitas!",
                    author: {
                        name: 'Alvin Jay Cosare'
                    },
                    date_posted: new Date()
                },
                {
                    title: 'Second Post',
                    content: 'A pure form of control is the joy. Going to the pyramid doesn’t hurt sorrow anymore than gaining creates further love.Strawberries pilaf has to have a sliced, chopped pork butt component.',
                    author: {
                        name: 'Ariette June Guillermo'
                    },
                    date_posted: new Date()
                }
            ];

            $ionicModal.fromTemplateUrl('views/posts/modal/add.html', {
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
            // Submit posts
            $scope.submit = function(){
                if(! $scope.post.title || ! $scope.post.content || ! $scope.post.author.name || ! $scope.post.date_posted) {
                    $scope.showAlert('Incomplete', 'Please fill in all fields');
                }
                else
                {
                    //insert new post
                    $scope.posts.push($scope.post);
                    //close modal
                    $scope.closeModal();
                    //empty post object
                    $scope.post = {};

                }
            }
            $scope.refresh = function() {
                $scope.$broadcast("scroll.refreshComplete");
            }

            $scope.delete = function ($routeParams) {
                $scope.showConfirmDelete('Confirmation', 'Are you sure you want to delete this post?', $routeParams.index);
            }

            //Popovers
            // A confirm dialog
            $scope.showConfirmDelete = function(title, message, index) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: message,
                    scope: $scope,
                    okText: 'Confirm', // String (default: 'OK'). The text of the OK button.
                    okType: 'button-assertive' // String (default: 'button-positive'). The type of the OK button.
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $scope.posts.splice(index, 1);
                    }
                });
            };

            // An alert dialog
            $scope.showAlert = function(title,message) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: message
                });
            };

            //reset ion-content start-y
            $scope.resetScroll = function(){
                $ionicScrollDelegate.scrollTo(0,50,true);
            }

            $scope.checkSearch = function(){
                if($ionicScrollDelegate.getScrollPosition().top > 40  && $ionicScrollDelegate.getScrollPosition().top < 100) {
                    console.log($ionicScrollDelegate.getScrollPosition());
                }
            }

            $scope.toggleSearch = function(){
                $scope.data.showSearch = ! $scope.data.showSearch;
                setTimeout(function(){
                    $ionicScrollDelegate.scrollTop();
                    $("#searchBox").focus();
                }, 1);
            }
        });
})(window.angular);