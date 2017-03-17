(function () {
    'use strict';
    
    angular.module('core.project').factory('Project', ['$http',
        function ($http) {
            var data, httpRequest;
            var self = this;
            self.request = function () {
                httpRequest = $http
                    .get('portfolioData/projects/' + self.projectId)
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