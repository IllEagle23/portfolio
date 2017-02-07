'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Portfolio Application', function() {

  it('should redirect `index.html` to `index.html#!/portfolio', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/portfolio');
  });
});
