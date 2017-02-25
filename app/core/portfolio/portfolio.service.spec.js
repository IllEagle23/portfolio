'use strict';

describe('Factory: Portfolio', function() {
    var $httpBackend;
    var Portfolio, projects;
    var $location = {};
    var portfolioData = {
        "globalHeader": {
            "home": {
                "title": "Home"
            }
        }
    };
    // Load the module that contains the `Portfolio` service before each test
    beforeEach(module('core.portfolio'));
    // Instantiate the service and "train" `$httpBackend` before each test
    beforeEach(inject(function(_$httpBackend_, _Portfolio_) {
        jasmine.addCustomEqualityTester(angular.equals);
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('portfolioData/portfolio.json').respond(portfolioData);
        Portfolio = _Portfolio_;
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
    it('should fetch the portfolio data from `/portfolioData/portfolio.json`', function() {
        expect(projects).toEqual(portfolioData);
    });
    it('should set the default route on app load to `/home`', function () {
        expect(Portfolio.GetCurrentRoute()).toEqual('/home');
        expect(Portfolio.GetCleanRoute()).toEqual('home');
    });
    it('should set current route to `about` and previous route to`home`', function () {
        Portfolio.SetCurrentRoute('/about');
        expect(Portfolio.GetCurrentRoute()).toEqual('/about');
        Portfolio.SetPreviousRoute('/home');
        expect(Portfolio.GetPreviousRoute()).toEqual('/home');
        expect(Portfolio.GetCleanRoute()).toEqual('about');
    });
});

// Research todo
// How to unit test services properly
// Change $location.$$path to /about and retest?