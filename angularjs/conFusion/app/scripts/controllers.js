                  'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(function(response) {
              $scope.dishes = response;
              $scope.showMenu = true;

            },function(response) {
               $scope.message = "Error: "+response.status + " " + response.statusText;

            });


            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {

            $scope.sendFeedback = function() {

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                }
                else {
                  feedbackFactory.getfeedback().save($scope.feedback, function (response) {
                    console.log(response);

                  });
                    $scope.feedback
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message="Loading ...";
            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
              .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
            );

        }])

        .controller('DishCommentController', ['$scope', function($scope) {

            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                $scope.dish.comments.push($scope.mycomment);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])


        // implement the IndexController and About Controller here
        .controller('AboutController',['$scope', 'corporateFactory', function( $scope,corporateFactory) {
           $scope.showleader = false;
           corporateFactory.getLeaders().query(function(response) {
             $scope.leaders = response;
             $scope.showMenu = true;
           },function(response) {
              $scope.message = "Error: "+response.status + " " + response.statusText;
           });
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope,  menuFactory, corporateFactory) {
          $scope.showDish = false;
          $scope.message="Loading ...";
          menuFactory.getDishes().get({id:0})
              .$promise.then(
                  function(response){
                      $scope.featureDish =response;
                      $scope.showDish = true;
                  },
                  function(response) {
                      $scope.message = "Error: "+response.status + " " + response.statusText;
                  }
              );

          menuFactory.getPromotions().get({id:0})
              .$promise.then(
                  function(response){
                      $scope.promotion =response;
                      $scope.showDish = true;
                  },
                  function(response) {
                      $scope.message = "Error: "+response.status + " " + response.statusText;
                  }
              );

            corporateFactory.getLeaders().get({id:3})
              .$promise.then(function (response) {
                $scope.executiveChef = response;
              },
            function (response) {
              $scope.message = "Error: "+response.status + " " + response.statusText;
            });
        }])

        .controller('MathController', ['$scope', function ($scope){
          $scope.multiply = function (a, b){
            return a*b;
          }


        }])
;
