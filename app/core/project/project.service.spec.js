'use strict';

describe('Project', function() {
    var $httpBackend;
    var Project;
    var projectData = {
        "title":"Project 0 title for detail screenzzz",
        "description":"FPO description"
    };
    // Add a custom equality tester before each test
    beforeEach(function() {
        jasmine.addCustomEqualityTester(angular.equals);
    });
    // Load the module that contains the `Project` service before each test
    beforeEach(module('core.project'));
    // Instantiate the service and "train" `$httpBackend` before each test
    beforeEach(inject(function(_$httpBackend_, _Project_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('portfolioData/projects/project0.json').respond(projectData);
        Project = _Project_;
    }));
    // Verify that there are no outstanding expectations or requests after each test
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    it('should fetch the project data from `/portfolioData/projects/project0.json`', function() {
        var project = Project.query();
        expect(project).toEqual({});
        $httpBackend.flush();
        expect(project).toEqual(projectData);
    });
});