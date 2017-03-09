(function () {
    'use strict';

// Register `resumePage` component, along with its associated controller and template
    angular.module('view.resumePage').component('resumePage', {
        templateUrl: 'view/resume-page/resume-page.template.html',
        controller: ['Resume',
            function ResumePageController(Resume) {
                var self = this;
                
                var googleDiv, contents, styleDiv, styles;
                Resume.then(function(htmldoc) {
                    googleDiv = $("#google-resume-doc");
                    contents = googleDiv.contents();
                    contents.html(htmldoc.data);
                    contents.find('a[href^="http://"]').attr("target", "_blank");
                    contents.find('a[href^="https://"]').attr("target", "_blank");
                    styleDiv = googleDiv.find('style');
                    styles = styleDiv.html();
                    styles = styles.replace(/\.c/g, '.container .c');
                    styles = styles.replace(/\.container \.com/g, '.com');
                    styles = styles.replace(/h1{/, '.container h1{');
                    styles = styles.replace(/h2{/, '.container h2{');
                    styles = styles.replace(/h3{/, '.container h3{');
                    styles = styles.replace(/h4{/, '.container h4{');
                    styles = styles.replace(/h5{/, '.container h5{');
                    styles = styles.replace(/h6{/, '.container h6{');
                    styles = styles.replace(/p{/, '.container p{');
                    styles = styles.replace(/\.title{/, '.container .title{');
                    styles = styles.replace(/\.subtitle{/, '.container .subtitle{');
                    styles = styles.replace(/Calibri/g, 'Lato');
                    styles = styles.replace(/Arial/g, 'Lato');
                    styles = styles.replace(/#ff6600/g, '#99cfcf');
                    styles = styles.replace(/li{/g, '.container li{');
                    // console.log(styles);
                    styleDiv.html(styles);
                    googleDiv.addClass("loaded");
                });
            }
        ]
    });
})();