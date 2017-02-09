'use strict';

describe('projectList', function () {
    // Load the module that contains the `projectList` component before each test
    beforeEach(module('view.projectList'));
    // Test the controller
    describe('ProjectListController', function () {
        var $httpBackend, ctrl;
        beforeEach(inject(function ($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('portfolioData/portfolio.json')
                .respond({name: 'Project 1'}, {name: 'Project 2'});
            ctrl = $componentController('projectList');
        }));
        it('should create a `portfolio` property with 2 projects fetched with `$http`', function () {
            jasmine.addCustomEqualityTester(angular.equals);
            expect(ctrl.projects).toEqual({});
            $httpBackend.flush();
            expect(ctrl.projects).toEqual({name: 'Project 1'}, {name: 'Project 2'});
        });
    });
});