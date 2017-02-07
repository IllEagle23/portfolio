(function () {
    'use strict';
    
    angular.module('core.project').factory('Project', ['$resource',
        function ($resource) {
            return $resource('portfolioData/projects/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'project0'}
                }
            });
        }
    ]);
})();
