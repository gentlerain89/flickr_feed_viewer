//Init and register all modules 
angular.module('flickv.controllers', ['restangular']);
angular.module('flickv.directives', []);

var flickrViewer = angular.module('flickrViewer', ['ngRoute', 'flickv.controllers', 'flickv.directives']);

flickrViewer.run(function () {
    
}); /********************************************************
	Contains the application route configuration
********************************************************/

flickrViewer.config(['$routeProvider',
function ($routeProvider) {

	$routeProvider.
        when('/feeds', {
            templateUrl: 'feed-viewer/feed-viewer.tmpl.html',
            controller: 'FeedViewerController'
        }).
        when('/', {
            templateUrl: 'home/home.tmpl.html'
        }).
        otherwise({
            redirectTo: '/'
        });

}]); /**
	Contains some stuff of the cell
	This directive is created for demostration purpose, 
	not really required in simple app like this
	It receive 3 attributes:
	+ ngModel: must be an object.
	+ cell-source-attr: name of the field (of model object) that is image's source
	+ cell-name-attr: name of the field (of model object) that is image's name
**/

flickvDirectivesModule = angular.module('flickv.directives');

flickvDirectivesModule.directive('flickvCell', [function () {
	 return {
        restrict: 'AE',
        templateUrl: "/components/cell/cell.tmpl.html",
        link: function (scope, element, attrs) {

        	var ngModel = scope[attrs.cellModel];
    		if(attrs.cellSourceAttr && ngModel[attrs.cellSourceAttr])
    			scope.imgSrc = ngModel[attrs.cellSourceAttr];
    		else 
    			scope.imgSrc = "/images/no-image.png";

    		if(attrs.cellNameAttr && ngModel[attrs.cellNameAttr])
    			scope.imageName = ngModel[attrs.cellNameAttr];
    		else 
    			scope.imageName = "";

            if(attrs.cellTagsAttr && ngModel[attrs.cellTagsAttr])
                scope.tags = ngModel[attrs.cellTagsAttr];
            else 
                scope.tags = "";
        	
        }
    }
}]);
 /**
	The search box that convert and display user inputed tags.
	Each time user type words and hit enter, the word will become a tag in this search box

	The search behavior and reset searching behavior is passed from the caller
**/
flickvDirectivesModule = angular.module('flickv.directives');
flickvDirectivesModule.directive('flickvSearch', function (){
	return {
		replace: true,
		templateUrl: '/components/search-box/search-box.tmpl.html',
		restrict: 'E',
		scope: {
			searchSubmit: '&',
			clearSearchCallBack: '&'
		},
		link: function (scope, elem, attrs){

			scope.searchValues = null;
			scope.selectedValue = null;
			scope.searchBoxPaddingLeft = 0;
			scope.searchBoxPaddingTop = 0;

			scope.clearSearch = function () {
				scope.selectedValue = undefined;
				scope.searchValues = [];
				scope.searchBoxPaddingLeft = 0;
				scope.searchBoxPaddingTop = 0;
				scope.clearSearchCallBack({});
			};

			elem.find("#attrVal").bind("keydown keypress", function (event) {
	            if(event.which === 13 && scope.selectedValue) {	
	            	scope.$apply(function(){

	            		if(scope.searchValues) scope.searchValues.push(scope.selectedValue);
	            		else {
	            			scope.searchValues = [];
	            			scope.searchValues.push(scope.selectedValue);	
	            		}
	            		
	            		//Begin new line if it has gone to the end of the box, so reset the padding
	            		// 80 is the length of the hidden search box
	            		if((scope.searchBoxPaddingLeft + scope.selectedValue.length * 5 + 51 + 80) > 450) {
	            			scope.searchBoxPaddingLeft = 0;
	            			scope.searchBoxPaddingTop += 40;
	            		} else {
	            			scope.searchBoxPaddingLeft += (scope.selectedValue.length * 5 + 51);	
	            		}

	            		scope.selectedValue = undefined;
	            	});

	                scope.searchSubmit({
	                	"$searchValues" : scope.searchValues
	                });
	                event.preventDefault();
	            }
        	});

			//Transfer the focus to child each time the big box is clicked
			elem.on("click", function() {
				elem.find('#attrVal').focus();
			});

			scope.removeTerm = function(index) {
				if(scope.searchValues && scope.searchValues.length > index) {
					scope.searchValues.splice(index, 1);
					scope.searchSubmit({
	                	"$searchValues" : scope.searchValues
	                });
				}
			}
		}

	}
}); 
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