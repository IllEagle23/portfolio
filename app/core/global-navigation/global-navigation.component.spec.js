// works if $attrs not included in HeaderController
(function () {
    'use strict';
    
    describe('globalNavigation', function () {
        // Load the module that contains the `projectList` component before each test
        // Include dependencies needed for testing
        beforeEach(module('core.globalNavigation', 'core.portfolio'));
        // Test the controller
        describe('NavigationController', function () {
            var $httpBackend, ctrl, Portfolio, $attrs;
            var defaultRoute = '/home';
            beforeEach(inject(function ($componentController, _$httpBackend_, _Portfolio_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('portfolioData/portfolio.json')
                    .respond({globalHeader: {'home': {'title': 'Home'}}});
                $attrs = { 'datapath': 'globalHeader' };
                ctrl = $componentController('globalNavigation', {$attrs: $attrs});
                Portfolio = _Portfolio_;
            }));
            it('should create a `portfolio` property with 1 nav item fetched with `$http`', function () {
                Portfolio.GetCurrentRoute = function () {
                    return defaultRoute;
                };
                jasmine.addCustomEqualityTester(angular.equals);
                expect(ctrl.data).toEqual({});
                $httpBackend.flush();
                expect(ctrl.data).toEqual({globalHeader: {'home': {'title': 'Home', 'isSelected': 'active'}}});
            });
        });
    });
})();


// RESEARCH
// Google searches todo :
// inject $attrs into unit test for angular
// ngMock
//
//
// https://docs.angularjs.org/api/ngMock/service/$componentController
// If you are using $element or $attrs in the controller, make sure to provide them as locals. The $element must be a jqLite-wrapped DOM element, and $attrs should be an object that has all properties / functions that you are using in the controller. If this is getting too complex, you should compile the component instead and access the component's controller via the controller function.
//
//
//
//
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