(function () {
    'use strict';

// Register `projectList` component, along with its associated controller and template
    angular.module('view.projectList').component('projectList', {
        templateUrl: 'view/project-list/project-list.template.html',
        controller: ['Portfolio',
            function ProjectListController(Portfolio) {
                var self = this;
                // UNIT TEST
                self.projects = Portfolio.query(function (event) {
                });
                // E2E TEST
                self.ProjectDetail = function ProjectDetail(id) {
                    event.preventDefault();
                    Portfolio.SetNextRoute("portfolio/" + id);
                    Portfolio.SetLocation();
                };
            }
        ]
    });
})();