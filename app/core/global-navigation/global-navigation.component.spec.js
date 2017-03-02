// works if $attrs not included in HeaderController
(function () {
    'use strict';
    
    describe('Component: global-navigation', function () {
        // Load the module that contains the `projectList` component before each test
        // Include dependencies needed for testing
        beforeEach(module('core.globalNavigation', 'core.portfolio'));
        // Test the controller
        describe('Controller: NavigationController', function () {
            var $httpBackend, ctrl, Portfolio, $attrs, event, $route;
            beforeEach(inject(function ($componentController, _$httpBackend_, _Portfolio_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('portfolioData/portfolio.json').respond({globalHeader: {'home': {'title': 'Home'}, 'about': {'title': 'About'}}});
                $attrs = { 'datapath': 'globalHeader' };
                event = {};
                event.preventDefault = function () {};
                $route = {};
                $route.current = {title:'Jamie Lloyd, Portfolio 2017 : Home'};
                ctrl = $componentController('globalNavigation', {$attrs: $attrs, event:event, $route:$route});
                Portfolio = _Portfolio_;
                jasmine.addCustomEqualityTester(angular.equals);
                expect(ctrl.data).toEqual({});
                $httpBackend.flush();
            }));
            it('should create a `portfolio` property with 1 nav item fetched with `$http`', function () {
                expect(ctrl.data).toEqual({globalHeader: {'home': {'title': 'Home', 'isSelected': 'active'}, 'about': {'title': 'About'}}});
                expect(ctrl.data.globalHeader.home.isSelected).toEqual('active');
            });
            it('should simulate the about route rollover', function () {
                Portfolio.GetTopRoute = function () {
                    return 'home';
                };
                ctrl.NavItemMouseEnter('About');
                expect(ctrl.title).toEqual('about');
                expect(ctrl.data.globalHeader.about.isSelected).toEqual('active');
            });
            it('should simulate the about route rollout', function () {
                Portfolio.GetTopRoute = function () {
                    return 'home';
                };
                ctrl.NavItemMouseLeave('About');
                expect(ctrl.title).toEqual('about');
                expect(ctrl.data.globalHeader.about.isSelected).toEqual('inactive');
            });
            it('should simulate change to about route success', function () {
                Portfolio.GetPreviousRoute = function () {
                    return 'home';
                };
                Portfolio.GetTopRoute = function () {
                    return 'about';
                };
                ctrl.SetNavItemSelected();
                expect(ctrl.data.globalHeader.home.isSelected).toEqual('inactive');
                expect(ctrl.data.globalHeader.about.isSelected).toEqual('active');
            });
        });
    });
})();

// RESEARCH
// Testing todo :
// https://jasmine.github.io/1.3/introduction.html
//
// https://docs.angularjs.org/api/ngMock/service/$componentController
// https://docs.angularjs.org/guide/component#unit-testing-component-controllers
// http://www.bradoncode.com/blog/2015/06/05/ngmock-fundamentals-testing-controllers/
//
//
//
// https://docs.angularjs.org/guide/unit-testing
// http://stackoverflow.com/questions/21313181/injecting-attrs-in-angularjs
// scroll down to controllerProvider example
// https://code.angularjs.org/1.6.1/docs/api/ngMock/service/$httpBackend
//
// response needs to reflect expected data structure
// create vars to any dependencies