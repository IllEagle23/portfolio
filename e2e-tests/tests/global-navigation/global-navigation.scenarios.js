'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Portfolio navigation', function () {
    it('should redirect to `/`', function () {
        browser.get('/');
        expect(browser.getLocationAbsUrl()).toBe('/');
    });
    var globalHeader,
        query,
        portfolioLI,
        portfolioButton,
        resumeLI,
        resumeButton,
        linkedinLI,
        linkedinButton,
        contactLI,
        contactButton,
        mainLogoButton,
        projectTestButton;
    var hasClass = function (element, cls) {
        return element.getAttribute('class').then(function (classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };
    globalHeader = element.all(by.repeater('navItem in $ctrl.data.globalHeader'));
    query = element(by.model('$ctrl.query'));
    
    portfolioButton = element(by.id('Portfolio'));
    portfolioLI = element(by.cssContainingText('li a', 'Portfolio'));
    resumeButton = element(by.id('Resume'));
    resumeLI = element(by.cssContainingText('li a', 'Resume'));
    linkedinButton = element(by.id('LinkedIn'));
    linkedinLI = element(by.cssContainingText('li a', 'LinkedIn'));
    contactButton = element(by.id('Contact'));
    contactLI = element(by.cssContainingText('li a', 'Contact'));
    mainLogoButton = element(by.id('main-logo'));
    projectTestButton = element(by.id('hotwire'));
    
    describe('View : Navigation', function() {
        it('should have 4 items in the global header', function() {
            expect(globalHeader.count()).toBe(4);
        });
        it('should default to portfolio nav item active on load', function() {
            expect(hasClass(portfolioLI, 'active')).toBe(true);
        });
        it('should navigate to the resume page from the portfolio page', function () {
            resumeButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/resume');
            expect(hasClass(resumeLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
        });
        it('should navigate to the linkedin page from the resume page', function () {
            linkedinButton.click().then(function () {
                browser.getAllWindowHandles().then(function (handles) {
                    browser.switchTo().window(handles[1]).then(function () {
                        expect(browser.driver.getCurrentUrl()).toBeTruthy('https://www.linkedin.com/');
                    });
                    browser.close();
                    browser.switchTo().window(handles[0]).then(function () {
                        expect(browser.getLocationAbsUrl()).toBe('/resume');
                        expect(hasClass(resumeLI, 'active')).toBe(true);
                        expect(hasClass(portfolioLI, 'inactive')).toBe(true);
                    });
                });
            });
        });
        it('should navigate to the contact page from the resume page', function () {
            contactButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/contact');
            expect(hasClass(contactLI, 'active')).toBe(true);
            expect(hasClass(resumeLI, 'inactive')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
        });
        it('should navigate to the portfolio page from the contact page via the logo button', function () {
            mainLogoButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/');
            expect(hasClass(portfolioLI, 'active')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
            expect(hasClass(resumeLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the contact page from the portfolio page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/contact');
            expect(hasClass(contactLI, 'active')).toBe(true);
            expect(hasClass(resumeLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the resume page from the contact page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/resume');
            expect(hasClass(resumeLI, 'active')).toBe(true);
            expect(hasClass(portfolioLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
        it('should navigate back to the portfolio page from the resume page', function () {
            browser.navigate().back();
            expect(browser.getLocationAbsUrl()).toBe('/');
            expect(hasClass(portfolioLI, 'active')).toBe(true);
            expect(hasClass(resumeLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
            expect(hasClass(contactLI, 'inactive')).toBe(true);
        });
        it('should navigate to the hotwire detail page from the portfolio page', function () {
            projectTestButton.click();
            expect(browser.getLocationAbsUrl()).toBe('/portfolio/hotwire/ux-development');
            expect(hasClass(portfolioLI, 'active')).toBe(true);
            expect(hasClass(resumeLI, 'inactive')).toBe(true);
            expect(hasClass(linkedinLI, 'inactive')).toBe(true);
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