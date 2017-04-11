(function () {
    'use strict';
    
    describe('projectDetail', function () {
        // Load the module and it's dependencies before each test
        beforeEach(module('view.projectDetail', 'core.project'));
        // Test the controller
        describe('ProjectDetailController', function () {
            var $httpBackend, ctrl, Project;
            var projectHtml = "<h1>Test project html file load</h1>";
            beforeEach(inject(function ($componentController, _$httpBackend_, $routeParams, _Project_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('content/portfolioData/projects/hotwire/test-project.html').respond(projectHtml);
                $routeParams.clientId = 'hotwire';
                $routeParams.projectId = 'test-project';
                ctrl = $componentController('projectDetail');
                Project = _Project_;
            }));
            it('should fetch the project detail', function () {
                jasmine.addCustomEqualityTester(angular.equals);
                expect(ctrl.projectRequest).toEqual({});
                $httpBackend.flush();
                expect(ctrl.projectRequest.$$state.value.data).toEqual(projectHtml);
            });
        });
    });
})();