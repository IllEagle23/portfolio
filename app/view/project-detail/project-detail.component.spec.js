(function () {
    'use strict';
    
    describe('projectDetail', function () {
        // Load the module and it's dependencies before each test
        beforeEach(module('view.projectDetail', 'core.project'));
        // Test the controller
        describe('ProjectDetailController', function () {
            var $httpBackend, ctrl, Project;
            var projectData = {
                "title": "Project 0 title for detail screenzzz",
                "description": "FPO description"
            };
            beforeEach(inject(function ($componentController, _$httpBackend_, $routeParams, _Project_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.expectGET('portfolioData/projects/project0.json').respond(projectData);
                $routeParams.projectId = 'project0';
                ctrl = $componentController('projectDetail');
                Project = _Project_;
            }));
            it('should fetch the project detail', function () {
                jasmine.addCustomEqualityTester(angular.equals);
                expect(ctrl.project).toEqual({});
                $httpBackend.flush();
                expect(ctrl.project).toEqual(projectData);
            });
        });
    });
})();