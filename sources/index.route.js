/********************************************************
	Contains the application route configuration
********************************************************/

flickrViewer.config(['$routeProvider',
function ($routeProvider) {

	$routeProvider.
        when('/feeds', {
            templateUrl: 'feeds/feeds.html',
            controller: 'FeedsController'
        }).
        when('/', {
            templateUrl: 'home/home.html'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);