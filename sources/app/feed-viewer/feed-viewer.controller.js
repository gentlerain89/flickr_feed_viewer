
flickvControllersModule = angular.module('flickv.controllers');

flickvControllersModule.controller('FeedViewerController', ['$scope', 'Restangular',
    function ($scope, Restangular) {
  		$scope.fieldName ={
  			"NAME" : "name",
  			"SOURCE" : "source",
  			"TAGS" : "tags"
  		}  	

  		$scope.viewGrid = true;
  		$scope.imageList = null;
      $scope.serverError = null;

      //Method to search with query
      $scope.searchSubmit = function(searchTags) {

        var searchTerm = "";
        $scope.imageList = null;
        $scope.serverError = null;

        if(searchTags.length > 0) searchTerm = encodeURI(searchTags.toString());
        else searchTerm = -1;

        Restangular.one("api/feeds/" + searchTerm).get().then(function(data){
          if(data.status == 200) {
            $scope.imageList = data.feeds;
          } else if(data.status == 500) {
            $scope.serverError = data.error;
          }
          
        }); 

      }
  		$scope.searchSubmit([]);
}]);