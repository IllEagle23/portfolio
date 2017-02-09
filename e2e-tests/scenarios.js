'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Portfolio Application', function () {
    it('should redirect `index.html` to `index.html#!/', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toBe('/');
    });
    describe('projectList', function() {
    
        beforeEach(function () {
            browser.get('index.html');
        });
    
        
    
        // it('should render phone specific links', function () {
        //     var query = element(by.model('$ctrl.query'));
        //     query.sendKeys('nexus');
        //
        //     element.all(by.css('.phones li a')).first().click();
        //     expect(browser.getLocationAbsUrl()).toBe('/phones/nexus-s');
        // });
    })
});
