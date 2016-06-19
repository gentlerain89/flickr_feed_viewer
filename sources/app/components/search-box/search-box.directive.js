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