//jshint strict: false
exports.config = {
    
    allScriptsTimeout: 11000,
    
    capabilities: {
        'browserName': 'chrome'
    },
    suites: {
        globalNavigation: ['./tests/global-navigation/global-navigation.scenarios.js']
    },
    
    baseUrl: 'http://localhost:8000/',
    
    framework: 'jasmine',
    
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
    
};
