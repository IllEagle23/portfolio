'use strict';

// Register `globalHeader` component, along with its associated controller and template
angular.module('core.globalHeader').component('globalHeader', {
    templateUrl: 'core/global-header/global-header.template.html',
    controller: ['Portfolio',
        function HeaderController(Portfolio) {
            var self = this;
            self.data = Portfolio.query(function (event) {
                event.globalHeader[Portfolio.GetCurrentRoute()].isSelected = 'active';
            });
            self.HeaderClick = function HeaderClick (title) {
                // set inactive css class of previous nav item
                self.title = title.toLowerCase();
                if (self.title != Portfolio.GetCurrentRoute()) {
                    self.data.globalHeader[Portfolio.GetCurrentRoute()].isSelected = "inactive";
                    Portfolio.SetCurrentRoute(self.title);
                    self.data.globalHeader[self.title].isSelected = "active";
                }
            };
            self.MouseEnter = function MouseEnter (title) {
                // set enter css class of nav item
                self.title = title.toLowerCase();
                if (self.title != Portfolio.GetCurrentRoute()) {
                    self.data.globalHeader[self.title].isSelected = "inactive";
                }
            };
        }
    ]
});