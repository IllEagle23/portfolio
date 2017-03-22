(function () {
    'use strict';
var isLoaded;
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
                    styleDiv.html("");
                    styles = styles.replace(/\.c/g, '.doc-container .c');
                    styles = styles.replace(/\.doc-container \.com/g, '.com');
                    styles = styles.replace(/h1{/, '.doc-container h1{');
                    styles = styles.replace(/h2{/, '.doc-container h2{');
                    styles = styles.replace(/h3{/, '.doc-container h3{');
                    styles = styles.replace(/h4{/, '.doc-container h4{');
                    styles = styles.replace(/h5{/, '.doc-container h5{');
                    styles = styles.replace(/h6{/, '.doc-container h6{');
                    styles = styles.replace(/p{/, '.doc-container p{');
                    styles = styles.replace(/\.title{/, '.doc-container .title{');
                    styles = styles.replace(/\.subtitle{/, '.doc-container .subtitle{');
                    styles = styles.replace(/Calibri/g, 'Lato');
                    styles = styles.replace(/Arial/g, 'Lato');
                    styles = styles.replace(/#ff6600/g, '#758799');
                    // styles = styles.replace(/#ff6600/g, '#99AFC6');
                    styles = styles.replace(/li{/g, '.doc-container li{');
                    styles = styles.replace(/background-color:#999999/g, 'background-color: #758799');
                    
                    
                    googleDiv.addClass("loaded");
                    // console.log(styles);
                    styleDiv.html(styles);
                });
            }
        ]
    });
})();