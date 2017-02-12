(function () {
    'use strict';

// Register `projectDetail` component, along with its associated controller and template
    angular.module('view.projectDetail').component('projectDetail', {
        templateUrl: 'view/project-detail/project-detail.template.html',
        controller: ['$routeParams', 'Project',
            function ProjectDetailController($routeParams, Project) {
                var self = this;
                self.project = Project.get({projectId: $routeParams.projectId}, function (project) {
                    // data loaded
                });
            }
        ]
    });
})();