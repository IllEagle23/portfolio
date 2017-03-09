//jshint strict: false
module.exports = function (config) {
    config.set({
        
        basePath: './app',
        
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            '**/*.module.js',
            '*!(.module|.spec).js',
            '!(bower_components)/**/*!(.module|.spec).js',
            '**/*.spec.js'
        ],
        
        autoWatch: true,
        
        frameworks: ['jasmine'],
        
        browsers: ['Chrome', 'Firefox', 'Cordova'],
        
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],
    
        cordovaSettings: {
            platforms: ['android', 'ios'],
            mode: 'emulate',
            hostip: '10.0.1.11:8000',
            plugins: [
                'org.apache.cordova.console'
            ]
        },
        reporters: ['dots', 'progress'],
        singleRun: true
    });
};
