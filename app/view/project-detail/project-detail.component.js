(function () {
    'use strict';

// Register `projectDetail` component, along with its associated controller and template
    angular.module('view.projectDetail').component('projectDetail', {
        templateUrl: 'view/project-detail/project-detail.template.html',
        controller: ['$routeParams', 'Project',
            function ProjectDetailController($routeParams, Project) {
                var self = this;
                var projectDiv, contents;
                Project.projectId = "test-project.html";
                self.projectRequest = Project.request();
                self.projectRequest.then(function(htmldoc) {
                    projectDiv = $("#project-div");
                    contents = projectDiv.contents();
                    contents.html(htmldoc.data);
                });
            }
        ]
    });
})();
