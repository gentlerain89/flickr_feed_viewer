//Init and register all modules 
angular.module('flickv.controllers', ['restangular']);
angular.module('flickv.directives', []);

var flickrViewer = angular.module('flickrViewer', ['ngRoute', 'flickv.controllers', 'flickv.directives']);

flickrViewer.run(function () {
    
});