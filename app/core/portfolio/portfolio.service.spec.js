(function () {
    'use strict';
    
    describe('Factory: Portfolio', function () {
        var $httpBackend;
        var Portfolio, projects;
        var $location = {};
        var portfolioData = {
            "globalHeader": {
                "portfolio": {
                    "title": "Portfolio"
                }
            }
        };
        // Load the module that contains the `Portfolio` service before each test
        beforeEach(module('core.portfolio'));
        // Instantiate the service and "train" `$httpBackend` before each test
        beforeEach(inject(function (_$httpBackend_, _Portfolio_) {
            jasmine.addCustomEqualityTester(angular.equals);
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('portfolioData/portfolio.json').respond(portfolioData);
            Portfolio = _Portfolio_;
            Portfolio.SetDefaultRoute('portfolio');
            projects = Portfolio.query();
            $location.$$path = '/';
            expect(projects).toEqual({});
            $httpBackend.flush();
        }));
        // Verify that there are no outstanding expectations or requests after each test
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should fetch the portfolio data from `/portfolioData/portfolio.json`', function () {
            expect(projects).toEqual(portfolioData);
        });
        it('should set the default route on app load to `/portfolio`', function () {
            expect(Portfolio.GetCurrentRoute()).toEqual('/portfolio');
            expect(Portfolio.GetTopRoute()).toEqual('portfolio');
        });
        it('should set current route to `about` and previous route to`home`', function () {
            Portfolio.SetCurrentRoute('/resume');
            expect(Portfolio.GetCurrentRoute()).toEqual('/resume');
            Portfolio.SetPreviousRoute('/portfolio');
            expect(Portfolio.GetPreviousRoute()).toEqual('/portfolio');
            expect(Portfolio.GetTopRoute()).toEqual('resume');
        });
    });
})();
// Research todo
// How to unit test services properly
// Change $location.$$path to /about and retest?