(function () {
    'use strict';

// Register `resumePage` component, along with its associated controller and template
    angular.module('view.resumePage').component('resumePage', {
        templateUrl: 'view/resume-page/resume-page.template.html',
        controller: ['Portfolio',
            function ResumePageController(Portfolio) {
                var self = this;
                var googleDiv;
                self.data = Portfolio.query(function (event) {
                    $.get("https://docs.google.com/document/d/1CRXE9zrw79gAWVs_UbUbYlU5mm1lpb34-mUjLfr2fBI/pub?embedded=true", function (html) {
                        googleDiv = $("#google-resume-doc");
                        var contents = googleDiv.contents();
                        contents.html(html);
                        contents.find('a[href^="http://"]').attr("target", "_blank");
                        contents.find('a[href^="https://"]').attr("target", "_blank");
                        var styleDiv = googleDiv.find('style');
                        var styles = styleDiv.html();
                        styles = styles.replace('h1', '.container h1');
                        styles = styles.replace('h6', '.container h6');
                        styles = styles.replace(/Calibri/g, 'Lato');
                        styles = styles.replace(/Arial/g, 'Lato');
                        styles = styles.replace(/#ff6600/g, '#99cfcf');
                        styleDiv.html(styles);
                    });
                });
            }
        ]
    });
})();