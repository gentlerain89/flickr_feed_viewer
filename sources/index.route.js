/********************************************************
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

}]);