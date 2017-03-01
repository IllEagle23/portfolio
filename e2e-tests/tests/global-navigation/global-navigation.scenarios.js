'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Portfolio navigation', function () {
    it('should redirect to `/`', function () {
        browser.get('/');
        expect(browser.getLocationAbsUrl()).toBe('/');
    });
    var globalHeader, query, homeLI, homeButton, aboutButton, aboutLI, portfolioLI, portfolioButton, contactLI, contactButton, mainLogoButton;
    var hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };
    globalHeader = element.all(by.repeater('navItem in $ctrl.data.globalHeader'));
    query = element(by.model('$ctrl.query'));
    homeButton = element(by.id('Home'));
    homeLI = element(by.cssContainingText('li a', 'Home'));
    aboutButton = element(by.id('About'));
    aboutLI = element(by.cssContainingText('li a', 'About'));
    portfolioButton = element(by.id('Portfolio'));
    portfolioLI = element(by.cssContainingText('li a', 'Portfolio'));
    contactButton = element(by.id('Contact'));
    contactLI = element(by.cssContainingText('li a', 'Contact'));
    mainLogoButton = element(by.id('main-logo'));
    
    describe('View : Navigation', function() {
        it('should have 4 items in the global header', function() {
            expect(globalHeader.count()).toBe(4);
        });
        it('should default to home nav item active on load', function() {
            expect(hasClass(homeLI, 'active')).toBe(true);
        });
        it('should navigate to the about page from the home page', function () {
            aboutButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/about');
            expect(hasClass(aboutLI, 'active')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
        });
        it('should navigate to the portfolio page from the about page', function () {
            portfolioButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/portfolio');
            expect(hasClass(portfolioLI, 'active')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
        });
        it('should navigate to the contact page from the portfolio page', function () {
            contactButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/contact');
            expect(hasClass(contactLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
        });
        it('should navigate to the home page from the contact page via the logo button', function () {
            mainLogoButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/');
            expect(hasClass(homeLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the contact page from the home page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/contact');
            expect(hasClass(contactLI, 'active')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the portfolio page from the contact page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/portfolio');
            expect(hasClass(portfolioLI, 'active')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the about page from the portfolio page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/about');
            expect(hasClass(aboutLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(homeLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the home page from the about page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/');
            expect(hasClass(homeLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(aboutLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
    })
});


// Initial expectations
    // Clicking project list item from home should deselect home, select top level portfolio nav item, and load project detail route
    // Clicking project from portfolio page should not deselect top level portfolio nav item and should load project detail route
    // Clicking footer link item should deselect header items, select footer nav item, and load footer nav route (none exist yet)
    // Clicking logo loads home route, selects home nav item, deselects all other nav items
    // Loading about should select about nav item
    // Loading experiments should select it and none others