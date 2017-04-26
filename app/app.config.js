(function () {
    "use strict";

// want /experiments
// want /experiments/experimentId
    
    angular.module('portfolioApp').config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $routeProvider.when('/', {
                title: 'Jamie Lloyd, Portfolio',
                template: '<portfolio-page></portfolio-page>'
            }).when('/about', {
                title: 'Jamie Lloyd, Portfolio : About',
                template: '<about-page></about-page>'
            }).when('/contact', {
                title: 'Jamie Lloyd, Portfolio : Contact',
                template: '<contact-page></contact-page>'
            }).when('/portfolio/:clientId', {
                title: 'Jamie Lloyd, Portfolio, Client Name',
                template: '<client-detail></client-detail>'
            }).when('/portfolio/:clientId/:projectId', {
                title: 'Jamie Lloyd, Portfolio',
                template: '<project-detail></project-detail>'
            }).when('/resume', {
                title: 'Jamie Lloyd, Portfolio : Resume',
                template: '<resume-page></resume-page>'
            }).when('/experiments', {
                title: 'Jamie Lloyd, Portfolio : Experiments',
                template: '<experiements></experiements>'
            }).when('/archives', {
                title: 'Jamie Lloyd, Portfolio : Archives',
                template: '<archives></archives>'
            }).otherwise('/');
            // $locationProvider.html5Mode(true);
            // breaks on route reload if not default when using node
            // htaccess fix worked on MT
            
            $locationProvider.hashPrefix('!');
        }
    ]);
})();
