(function () {
    'use strict';
    
    describe('Project', function () {
        var $httpBackend;
        var Project;
        var projectHtml = "<h1>Test project html file load</h1>";
        // Add a custom equality tester before each test
        beforeEach(function () {
            jasmine.addCustomEqualityTester(angular.equals);
        });
        // Load the module that contains the `Project` service before each test
        beforeEach(module('core.project'));
        // Instantiate the service and "train" `$httpBackend` before each test
        beforeEach(inject(function (_$httpBackend_, _Project_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('portfolioData/projects/test-project.html').respond(projectHtml);
            Project = _Project_;
        }));
        // Verify that there are no outstanding expectations or requests after each test
        // afterEach(function () {
        //     $httpBackend.verifyNoOutstandingExpectation();
        //     $httpBackend.verifyNoOutstandingRequest();
        // });
        it('should fetch the project html from `/portfolioData/projects/test-project.html`', function () {
            var projectRequest = Project.request("test-project.html");
            expect(projectRequest).toEqual({});
            $httpBackend.flush();
            expect(projectRequest.$$state.value.data).toEqual(projectHtml);
        });
    });
})();