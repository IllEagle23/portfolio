'use strict';

// Register `globalHeader` component, along with its associated controller and template
angular.module('core.globalHeader').component('globalHeader', {
    templateUrl: 'core/global-header/global-header.template.html',
    controller: ['Portfolio',
        function HeaderController(Portfolio) {
            var self = this;
            self.data = Portfolio.query(function (event) {
                // UNIT TEST
                self.data.globalHeader[Portfolio.GetCurrentRoute()].isSelected = 'active';
            });
            // E2E TEST
            self.NavItemClick = function NavItemClick (title) {
                // set inactive css class of previous nav item
                self.title = title.toLowerCase();
                if (self.title != Portfolio.GetCurrentRoute()) {
                    self.data.globalHeader[Portfolio.GetCurrentRoute()].isSelected = "inactive";
                    Portfolio.SetCurrentRoute(self.title);
                    self.data.globalHeader[self.title].isSelected = "active";
                }
            };
            // E2E TEST
            self.NavItemMouseEnter = function NavItemMouseEnter (title) {
                // set enter css class of nav item on mouse over
                self.title = title.toLowerCase();
                if (self.title != Portfolio.GetCurrentRoute()) {
                    self.data.globalHeader[self.title].isSelected = "inactive";
                }
            };
        }
    ]
});