(function () {
    'use strict';
    
    angular.module('core.project').factory('Project', ['$http',
        function ($http) {
            var data, httpRequest;
            var self = this;
            self.request = function (projectId) {
                httpRequest = $http
                    .get('content/portfolioData/projects/' + projectId)
                    .then(function (response) {
                        data = response;
                        return data;
                    });
                return httpRequest;
            };
            return self;
        }
    ]);
})();