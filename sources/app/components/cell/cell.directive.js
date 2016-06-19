/**
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
