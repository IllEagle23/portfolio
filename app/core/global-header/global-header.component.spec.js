(function () {
    'use strict';
    
    describe('globalHeader', function () {
        // Load the module that contains the `projectList` component before each test
        // Include dependencies needed for testing
        beforeEach(module('core.globalHeader', 'core.portfolio'));
        // Test the controller
        describe('HeaderController', function () {
            var $httpBackend, ctrl, Portfolio;
            var defaultRoute = '/home';
            beforeEach(inject(function ($componentController, _$httpBackend_, _Portfolio_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('portfolioData/portfolio.json')
                    .respond({globalHeader: {'home': {'title': 'Home'}}});
                ctrl = $componentController('globalHeader');
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
// response needs to reflect expected data structure
// create vars to any dependencies