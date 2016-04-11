var app = angular.module('simplytravel.controllers', []);

app.controller("SimplyController", function ($scope, SimplyService) {
	$scope.simply = SimplyService;
    
    $scope.doRefresh = function (){
      if(!$scope.simply.isLoading){
          $scope.simply.refresh().then(function(){
              $scope.$broadcast('scroll.refreshComplete');
          });
      }  
    };
    $scope.loadMore =function (){
      if(!$scope.simply.isLoading && $scope.simply.hasMore){
         $scope.simply.next().then(function (){
            $scope.$broadcast('scroll.infiniteScrollComplete'); 
         }); 
      }  
    };
    $scope.getDirections = function (hotel){
        console.log("Getting directions");
        var destination = [
			hotel.latitude,
			hotel.longitude
		];

		var source = [
			$scope.simply.lat,
			$scope.simply.lon
		];

		launchnavigator.navigate(destination, source);
    }
     $scope.openMap = function (hotel){
        console.log("Opening hotel in maps app");
    }
});