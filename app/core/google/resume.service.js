(function () {
    'use strict';
    
    angular.module('core.resume').factory('Resume', ['$http',
        function ($http) {
            var data;
            return $http
                .get('https://docs.google.com/document/d/1CRXE9zrw79gAWVs_UbUbYlU5mm1lpb34-mUjLfr2fBI/pub?embedded=true')
                .then(function (response) {
                    data = response;
                    return data;
                });
        }
    ]);
})();