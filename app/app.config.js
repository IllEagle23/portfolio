'use strict';

// want /experiments
// want /experiments/experimentId

angular.module('portfolioApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        
        
        $routeProvider.when('/',{
            template: '<home-page></home-page>'
        }).when('/about',{
            template:'<about-page></about-page>'
        }).when('/contact',{
            template:'<contact-page></contact-page>'
        }).when('/portfolio', {
            template: '<portfolio-page></portfolio-page>'
        }).when('/portfolio/:projectId', {
            template: '<project-detail></project-detail>'
        }).otherwise('/');
    
        // $locationProvider.html5Mode(true);
        // breaks on route reload if not default when using node
        // htaccess fix worked on MT
        
        $locationProvider.hashPrefix('!');
    }
]);
