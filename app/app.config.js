(function () {
    "use strict";

// want /experiments
// want /experiments/experimentId
    
    angular.module('portfolioApp').config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            
            
            $routeProvider.when('/', {
                title: 'Jamie Lloyd, Portfolio 2017 : Home',
                template: '<home-page></home-page>'
            }).when('/about', {
                title: 'Jamie Lloyd, Portfolio 2017 : About',
                template: '<about-page></about-page>'
            }).when('/contact', {
                title: 'Jamie Lloyd, Portfolio 2017 : Contact',
                template: '<contact-page></contact-page>'
            }).when('/portfolio', {
                title: 'Jamie Lloyd, Portfolio 2017 : Portfolio',
                template: '<portfolio-page></portfolio-page>'
            }).when('/portfolio/:projectId', {
                title: 'Jamie Lloyd, Portfolio 2017 : Project :projectId',
                template: '<project-detail></project-detail>'
            }).when('/resume', {
                title: 'Jamie Lloyd, Portfolio 2017 : Resume',
                template: '<resume-page></resume-page>'
            }).when('/experiments', {
                title: 'Jamie Lloyd, Portfolio 2017 : Experiments',
                template: '<experiements></experiements>'
            }).otherwise('/');
            
            // $locationProvider.html5Mode(true);
            // breaks on route reload if not default when using node
            // htaccess fix worked on MT
            
            $locationProvider.hashPrefix('!');
        }
    ]);
})();