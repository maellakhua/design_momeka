angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/feedback.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('CollectionsCtrl', function($scope,$http) {
    
          $http({
            url: "http://83.212.109.180/omeka/api/collections/",
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                $scope.collections = response;
            }).error(function(error){
                $scope.error = error;
            });
            
            alert ("test");
})

.controller('CollectionDetailCtrl', function($scope,$stateParams,$http) {
    
    
          $http({
            url: "http://83.212.109.180/omeka/api/collections/"+$stateParams.collectionId,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                $scope.collection_name = response.element_texts[0].text;
                 $http({
                    url: response.items.url,
                    dataType: "json",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                    }).success(function(response){

                        $scope.items = response;

                    }).error(function(error){
                        $scope.error = error;
                    });
                
                
                
            }).error(function(error){
                $scope.error = error;
            });
})


.controller('ItemDetailCtrl', function($scope,$stateParams,$http) {
    
    
    $http({
            url: "http://83.212.109.180/omeka/api/items/"+$stateParams.itemId,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                $scope.item = response;
                  
                
            }).error(function(error){
                $scope.error = error;
            });
})



.controller('CollectionCtrl', function($scope, $stateParams) {
});
