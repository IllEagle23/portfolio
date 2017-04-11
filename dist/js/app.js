(function () {
    "use strict";

// Define the `portfolioApp` module
    angular.module('portfolioApp', [
        'ngAnimate',
        'ngRoute',
        'core',
        'view',
        'ngTouch',
        'angulartics',
        'angulartics.google.analytics',
        'duScroll'
    ]);
})();
(function () {
    "use strict";

// want /experiments
// want /experiments/experimentId
    
    angular.module('portfolioApp').config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $routeProvider.when('/', {
                title: 'Jamie Lloyd, Portfolio',
                template: '<portfolio-page></portfolio-page>'
            }).when('/about', {
                title: 'Jamie Lloyd, Portfolio : About',
                template: '<about-page></about-page>'
            }).when('/contact', {
                title: 'Jamie Lloyd, Portfolio : Contact',
                template: '<contact-page></contact-page>'
            }).when('/portfolio/:clientId/:projectId', {
                title: 'Jamie Lloyd, Portfolio',
                template: '<project-detail></project-detail>'
            }).when('/resume', {
                title: 'Jamie Lloyd, Portfolio : Resume',
                template: '<resume-page></resume-page>'
            }).when('/experiments', {
                title: 'Jamie Lloyd, Portfolio : Experiments',
                template: '<experiements></experiements>'
            }).when('/archives', {
                title: 'Jamie Lloyd, Portfolio : Archives',
                template: '<archives></archives>'
            }).otherwise('/');
            // $locationProvider.html5Mode(true);
            // breaks on route reload if not default when using node
            // htaccess fix worked on MT
            
            $locationProvider.hashPrefix('!');
        }
    ]);
})();

(function () {
    'use strict';


// Define the `core` module
// `core` modules are global
// Research core module getter and setter functionality
    
    angular.module('core', ['core.portfolio', 'core.globalNavigation', 'core.project', 'core.resume', 'core.jlvideo']);
})();
(function () {
    'use strict';

// Define the `core.portfolio` module
    angular.module('core.portfolio', ['ngResource']);
})();
(function () {
    'use strict';
    // Register the Portfolio factory with it's route getters and setters used in navigation
    angular.module('core.portfolio').factory('Portfolio', ['$location','$resource', '$rootScope',
        function ($location, $resource, $rootScope) {
            var self = this;
            // Load resource
            self.data = $resource('content/portfolioData/:projectId.json', {}, {
                query: {
                    method: 'GET',
                    params: {projectId: 'portfolio'}
                }
            });
            self.data.SetDefaultRoute = function SetMainRoute (_route_) {
                self.mainRoute = _route_;
                self.data.CheckForSlash();
                self.data.SetTopRoute();
            };
            
            // On initial app load look into location object for current route
            self.data.SetLoadRoute = function SetLoadRoute () {
                self.currentRoute = $location.$$path;
            };
            self.data.CheckForSlash = function CheckForSlash () {
                if (self.currentRoute == "/" || self.currentRoute === "" || self.currentRoute === undefined) {
                    self.currentRoute = "/" + self.mainRoute;
                }
            };
            // Return current route for comparison to clicked nav item
            self.data.GetCurrentRoute = function GetCurrentRoute () {
                return self.currentRoute;
            };
            // Set current route to incoming _currentRoute_ on routeChange event
            self.data.SetCurrentRoute = function SetCurrentRoute (_currentRoute_) {
                // Route change may happen without click
                // Navigating with back and forward on browser via keyboard input
                // should still change nav item selected when not using the mouse to click
                self.currentRoute = _currentRoute_;
                self.data.CheckForSlash();
                self.data.SetTopRoute();
            };
            // Clean current route of slashes and sub-routes for css
            self.data.SetTopRoute = function SetTopRoute () {
                self.topRoute = self.currentRoute.split('/')[1];
            };
            // Return route for top level directories only
            self.data.GetTopRoute = function GetCleanRoute () {
                return self.topRoute;
            };
            // Set previous route to incoming _previousRoute_ on route change event
            self.data.SetPreviousRoute = function SetPreviousRoute (_previousRoute_) {
                self.previousRoute = _previousRoute_;
                if (self.previousRoute === "" || self.previousRoute === undefined) {
                    self.previousRoute = self.mainRoute;
                }
            };
            // Return previous route
            self.data.GetPreviousRoute = function GetPreviousRoute () {
                return self.previousRoute;
            };
            self.data.SetNextRoute = function SetNextRoute (_nextRoute_) {
                self.nextRoute = _nextRoute_;
            };
            // Set window location to incoming id
            self.data.SetLocation = function SetLocation () {
                // If /default is sent the route changes twice due to app config
                if (self.nextRoute == ('/' + self.mainRoute)) {self.nextRoute = '/';}
                $location.path(self.nextRoute);
            };
            // Listen to $rootScope for route change event
            $rootScope.$on('$routeChangeStart', function (scope, next, current) {
                self.SetRoutes(scope, next, current);
                $('html,body').animate({scrollTop:0},500);
            });
            // Redefine previous and current route on route change, set document title to route title
            self.SetRoutes = function SetRoutes(scope, next, current) {
                self.data.SetPreviousRoute(current.$$route.originalPath.split('/')[1]);
                self.data.SetCurrentRoute(next.$$route.originalPath);
                document.title = next.$$route.title;
            };
            self.data.SetLoadRoute();
            return self.data;
        }
    ]);
})();
// https://docs.angularjs.org/api/ngResource/service/$resource
// $resource(url template, [paramDefaults], [actions], options);
(function () {
    'use strict';

// Define the `core.project` module
    angular.module('core.project', []);
})();
(function () {
    'use strict';
    
    angular.module('core.project').factory('Project', ['$http',
        function ($http) {
            var data, httpRequest;
            var self = this;
            self.request = function (projectId) {
                httpRequest = $http
                    .get('content/portfolioData/projects/' + projectId)
                    .then(function (response) {
                        data = response;
                        return data;
                    });
                return httpRequest;
            };
            return self;
        }
    ]);
})();
(function () {
    'use strict';

// Define the `core.project` module
    angular.module('core.resume', []);
})();

(function () {
    'use strict';
    
    angular.module('core.resume').factory('Resume', ['$http',
        function ($http) {
            var data;
            return $http
                .get('https://docs.google.com/document/d/1CRXE9zrw79gAWVs_UbUbYlU5mm1lpb34-mUjLfr2fBI/pub?embedded=true')
                .then(function (response) {
                    data = response;
                    return data;
                });
        }
    ]);
})();
(function () {
    'use strict';

// Define the `core.global-navigation` module
    angular.module('core.globalNavigation', ['core.portfolio']);
})();
(function () {
    'use strict';

// Register `global-navigation` component, along with its associated controller and template
    angular.module('core.globalNavigation').component('globalNavigation', {
        templateUrl: function($element, $attrs) {
            return $attrs.templateUrl;
        },
        controller: ['$attrs', '$scope', 'Portfolio', '$route',
            function NavigationController($attrs, $scope, Portfolio, $route) {
                var self = this;
                if ($attrs.defaultRoute !== undefined) {
                    Portfolio.SetDefaultRoute($attrs.defaultRoute);
                }
                
                self.dataPath = $attrs.datapath;
                // Read from resource
                self.data = Portfolio.query(function () {
                    // Check if datapath has topRoute as an object
                    // It will otherwise be undefined and fail
                    // For example the footer datapath will likely not have the same header nav object
                    if (self.data[self.dataPath][Portfolio.GetTopRoute()] !== undefined) {
                        // Set default nav item active based on current route on page load / refresh
                        self.data[self.dataPath][Portfolio.GetTopRoute()].isSelected = 'active';
                    }
                });
                self.RouteClass = function RouteClass () {
                    return Portfolio.GetTopRoute();
                };
                // Set document title on header template init
                // Helpful in analytics page views
                self.SetDocumentTitle = function SetDocumentTitle () {
                    document.title = $route.current.title;
                };
                // Rollover and click animation for nav items based on assigned css class and mouse state
                // Template li repeat class is bound to isSelected, which can be active or inactive
                // hover.inactive css class scales bottom border width from 0 to 100%
                // .active css class scales bottom border width from 0 to 100%
                // .inactive css class scales bottom border width from 100 to 0%
                // CAN THIS SIMPLY RELY ON EVENT DEFAULT AND LET ROUTE CHANGE EVENT HANDLE BUTTON STATES?
                self.NavItemClick = function NavItemClick(event, title) {
                    // // Don't perform normal anchor tag click actions
                    // // This allows us to see the href location of our anchor tag in our browser on rollover
                    // event.preventDefault();
                    // // Passed from template on click for comparison to current route
                    // self.title = "/" + title.toLowerCase();
                    // // If title clicked != current route then set route and window location (view)
                    // if (self.title != Portfolio.GetCurrentRoute()) {
                    //     Portfolio.SetNextRoute(self.title);
                    //     Portfolio.SetLocation();
                    // }
                };
                // .inactive css class is only added by JS on rollover and not in the template by default
                // If it were, each nav item would perform the .inactive css class animation on page load
                // Not sure if there's a pure css way to do this?
                self.NavItemMouseEnter = function NavItemMouseEnter(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetTopRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "active";
                    }
                };
                self.NavItemMouseLeave = function NavItemMouseLeave(title) {
                    self.title = title.toLowerCase();
                    if (self.title != Portfolio.GetTopRoute()) {
                        self.data[self.dataPath][self.title].isSelected = "inactive";
                    }
                };
                // Listen to $rootScope for $routeChangeSuccess
                // Fires once for each navigation component in view
                $scope.$on('$routeChangeSuccess', function () {
                    self.SetNavItemSelected();
                });
                // On route change success
                // deactivate previous nav item if it exists in this component
                // and activate new one if it exists in this component
                self.SetNavItemSelected = function SetNavItemSelected () {
                    // Again, ensure the object exists in the datapath or this will fail
                    if (self.data[self.dataPath][Portfolio.GetPreviousRoute()] !== undefined) {
                        self.data[self.dataPath][Portfolio.GetPreviousRoute()].isSelected = "inactive";
                    }
                    if (self.data[self.dataPath][Portfolio.GetTopRoute()] !== undefined) {
                        self.data[self.dataPath][Portfolio.GetTopRoute()].isSelected = "active";
                    }
                };
            }
        ]
    });
})();
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-92897917-1', 'auto');
(function () {
    'use strict';

// Define the `core.jlvideo` module
    angular.module('core.jlvideo', ['core.project']);
})();
(function () {
    'use strict';
    
    angular.module('core.jlvideo').component('jlvideo', {
        templateUrl: function($element, $attrs) {
            return $attrs.templateUrl;
        },
        controller: ['$attrs', '$scope', '$element',
            function JlvideoController ($attrs, $scope, $element) {
                var self = this;
                self.attrs = $attrs;
                self.playButtonVisible = "show";
                self.VideoClick = function VideoClick () {
                    self.video = document.getElementById($attrs.videoId);
                    if (self.video.paused === true) {
                        // self.video.src = $attrs.src;
                        self.video.play();
                        self.playButtonVisible = "hide";
                    }
                    $("#" + $attrs.videoId).attr("controls", "true");
                    self.video.addEventListener("pause", function () {
                        $scope.$apply(function () {
                            self.playButtonVisible = "show";
                        });
                    });
                    // Pause / stop event listener to turn play button back on
                };
            }
        ]
    });
})();
(function () {
    'use strict';

// Define the `views` module
// `views` modules are global
// Research core module getter and setter functionality
    
    angular.module('view', ['view.homePage', 'view.aboutPage', 'view.contactPage', 'view.projectList', 'view.projectDetail', 'view.portfolioPage', 'view.resumePage']);
})();
(function () {
    'use strict';

// Define the `aboutPage` module
    angular.module('view.aboutPage', ['core.portfolio']);
})();
(function () {
    'use strict';

// Define the `contactPage` module
    angular.module('view.contactPage', ['core.portfolio']);
})();
(function () {
    'use strict';

// Define the `homePage` module
    angular.module('view.homePage', ['core.portfolio']);
})();
(function () {
    'use strict';

// Define the `portfolioPage` module
    angular.module('view.portfolioPage', ['core.portfolio']);
})();
(function () {
    'use strict';

// Define the `projectDetail` module
    angular.module('view.projectDetail', [
        'ngRoute',
        'core.project'
    ]);
})();
(function () {
    'use strict';

// Define the `projectList` module
    angular.module('view.projectList', ['core.portfolio']);
})();
(function () {
    'use strict';

// Define the `resumePage` module
    angular.module('view.resumePage', ['core.resume']);
})();
(function () {
    'use strict';

// Register `aboutPage` component, along with its associated controller and template
    angular.module('view.aboutPage').component('aboutPage', {
        templateUrl: 'view/about-page/about-page.template.html',
        controller: ['Portfolio',
            function AboutPageController(Portfolio) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                });
            }
        ]
    });
})();

(function () {
    'use strict';

// Register `contactPage` component, along with its associated controller and template
    angular.module('view.contactPage').component('contactPage', {
        templateUrl: 'view/contact-page/contact-page.template.html',
        controller: ['Portfolio',
            function ContactPageController(Portfolio) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                });
            }
        ]
    });
})();
(function () {
    'use strict';

// Register `homePage` component, along with its associated controller and template
    angular.module('view.homePage').component('homePage', {
        templateUrl: 'view/home-page/home-page.template.html',
        controller: ['Portfolio',
            function HomePageController(Portfolio) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                });
            }
        ]
    });
})();
// Limit project list for Home Page
// Figure out adding attributes to custom divs that can be read for use cases like this?
// self.data = event.data.slice(0, 5);
(function () {
    'use strict';

// Register `portfolioPage` component, along with its associated controller and template
    angular.module('view.portfolioPage').component('portfolioPage', {
        templateUrl: 'view/portfolio-page/portfolio-page.template.html',
        controller: ['Portfolio', '$document',
            function PortfolioPageController(Portfolio, $document) {
                var self = this;
                self.data = Portfolio.query(function (event) {
                    // data loaded
                    self.projectElement = angular.element(document.getElementById('#scroll-top'));
                });
                self.ScrollClick = function ScrollClick () {
                    event.preventDefault();
                    $document.scrollTo(self.projectElement, 55, 500);
                };
            }
        ]
    });
})();
(function () {
    'use strict';

// Register `projectDetail` component, along with its associated controller and template
    angular.module('view.projectDetail').component('projectDetail', {
        templateUrl: 'view/project-detail/project-detail.template.html',
        controller: ['$routeParams', 'Project', '$scope', '$compile',
            function ProjectDetailController($routeParams, Project, $scope, $compile) {
                var self = this;
                var article, video;
                self.testVar = "test data binding";
                self.projectRequest = Project.request($routeParams.clientId + "/" + $routeParams.projectId + ".html");
                self.projectRequest.then(function(htmldoc) {
                    article = $("article");
                    article.html(htmldoc.data);
                    $compile(article.contents())($scope);
                });
            }
        ]
    });
})();

(function () {
    'use strict';

// Register `projectList` component, along with its associated controller and template
    angular.module('view.projectList').component('projectList', {
        templateUrl: 'view/project-list/project-list.template.html',
        controller: ['Portfolio',
            function ProjectListController(Portfolio) {
                var self = this;
                self.projects = Portfolio.query(function (event) {
                    
                });
            }
        ]
    });
})();
(function () {
    'use strict';
var isLoaded;
// Register `resumePage` component, along with its associated controller and template
    angular.module('view.resumePage').component('resumePage', {
        templateUrl: 'view/resume-page/resume-page.template.html',
        controller: ['Resume',
            function ResumePageController(Resume) {
                var self = this;
                self.resumeURL = 'https://docs.google.com/document/d/1CRXE9zrw79gAWVs_UbUbYlU5mm1lpb34-mUjLfr2fBI/pub';
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