
angular.module('starter.controllers', [])

.controller('siteUrlCtrl', function($scope,Url,$http) {
    $scope.assignUrl = function(url){
        Url.setUrl(url);
        alert(url);
        
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
                
                $scope.items_in_collection=response.items.count;
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



.controller('SearchItemsCtrl', function($scope,$http) {
    $scope.onchange = function(){
          $http({
            url: "http://83.212.109.180/omeka/api/items/",
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                var jsonsearcharray = [];
                $scope.length=response.length;
                //var name=$scope.item_name;
                var y=$scope.item_name.toLowerCase();
                
//delete from omeka empty items!! SOS
                for (var i=0; i<response.length; i++){
                    var x=response[i].element_texts[0].text.toLowerCase();
                    if(x.indexOf(y)>-1){
                        //console.log(response[i].element_texts[0].text);
                        jsonsearcharray.push(response[i]);
                        //console.log(jsonsearcharray);
                    //break;
                    }
                }
                
                $scope.foundItems = angular.fromJson(jsonsearcharray);
                
            }).error(function(error){
                $scope.error = error;
            });
    };
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
                
                var jsonarray = [];
                $scope.length=response.element_texts.length;
                for (var i=0; i<response.element_texts.length; i++){
                    var jsonObj=new Object;
                    var x = response.element_texts[i].element.name;
                    var y=response.element_texts[i].text;
                     jsonObj[x]=y;
                    jsonarray.push(jsonObj);
                }
                 
                $scope.items = angular.fromJson(jsonarray);
                $scope.item_title = response.element_texts[0].text;

                $scope.pic_url=response.files.url;
                
                console.log($scope.pic_url);

//$scope.pic_url
$http({
            url: $scope.pic_url,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                var jsonarraypic = [];
                $scope.lengthpic=response.length;
                for (var i=0; i<response.length; i++){
                    var jsonObj2=new Object;
                    var x = response[i].file_urls.square_thumbnail;
                    var y=response[i].file_urls.original;
                     jsonObj2[x]=y;
                    jsonarraypic.push(jsonObj2);
                }
                 
                $scope.pics = angular.fromJson(jsonarraypic);
                
                
                
                $scope.pic_thumbnail_url=response[0].file_urls.square_thumbnail;               
                $scope.pic_original_url=response[0].file_urls.original;
                
            }).error(function(error){
                $scope.error = error;
            });
               
                
                
                
            }).error(function(error){
                $scope.error = error;
            });
})

.controller('latestCtrl', function($scope,$stateParams,$http) {
    
    
    $http({
            url: "http://83.212.109.180/omeka/api/items/",
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                
                $scope.length2=response.length;
                
                for(var i=$scope.length2-1;i>$scope.length2-5;i--){
                    $scope.latest_pic_url=response[i].files.url;
                                     var jsonarraypic3 = [];

                     
                     $http({
            url: $scope.latest_pic_url,
            dataType: "json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            }).success(function(response){
                    var jsonObj3=new Object;
                    var x = response[0].file_urls.square_thumbnail;
                    var y=response[0].item.id;
                     jsonObj3[x]=y;
                    jsonarraypic3.push(jsonObj3);
                    $scope.latest_pics = angular.fromJson(jsonarraypic3);

            }).error(function(error){
                $scope.error = error;
            });  
                }
               
            }).error(function(error){
                $scope.error = error;
            });
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    
  // Form data for the login modal
  $scope.searchData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeSearch = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.search = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doSearch = function() {
    console.log('Searching', $scope.searchData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeSearch();
    });
  };
});

