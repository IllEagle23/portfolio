(function () {
    'use strict';

// Register `projectDetail` component, along with its associated controller and template
    angular.module('view.projectDetail').component('projectDetail', {
        templateUrl: 'view/project-detail/project-detail.template.html',
        controller: ['$routeParams', 'Project', '$scope', '$compile',
            function ProjectDetailController($routeParams, Project, $scope, $compile) {
                var self = this;
                var article, video;
                self.projectId = $routeParams.projectId;
                self.projectRequest = Project.request($routeParams.clientId + "/" + $routeParams.projectId + ".html");
                self.projectRequest.then(function(htmldoc) {
                    article = $("#" + $routeParams.projectId);
                    article.html(htmldoc.data);
                    $compile(article.contents())($scope);
                });
            }
        ]
    });
})();