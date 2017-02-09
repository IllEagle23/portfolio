'use strict';

describe('Portfolio', function() {
    var $httpBackend;
    var Portfolio;
    var portfolioData = {
        "globalHeader": {
            "home": {
                "title": "Home"
            }
        }
    };
    // Add a custom equality tester before each test
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    // Load the module that contains the `Phone` service before each test
    beforeEach(module('core.portfolio'));
    // Instantiate the service and "train" `$httpBackend` before each test
    beforeEach(inject(function(_$httpBackend_, _Portfolio_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('portfolioData/portfolio.json').respond(portfolioData);
        Portfolio = _Portfolio_;
    }));
    // Verify that there are no outstanding expectations or requests after each test
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('should fetch the portfolio data from `/portfolioData/portfolio.json`', function() {
        var projects = Portfolio.query();
        expect(projects).toEqual({});
        $httpBackend.flush();
        expect(projects).toEqual(portfolioData);
    });
});
