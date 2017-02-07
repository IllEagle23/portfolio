'use strict';

// Register `projectList` component, along with its associated controller and template
angular.module('view.projectList').component('projectList', {
    templateUrl: 'view/project-list/project-list.template.html',
    controller: ['Portfolio',
        function ProjectListController(Portfolio) {
            var self = this;
            self.projects = Portfolio.query(function (event) {});
            self.ProjectDetail = function ProjectDetail (id) {
                Portfolio.SetCurrentRoute("portfolio/" + id);
            };
        }
    ]
});