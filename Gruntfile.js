module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'min-safe/js/main.min-safe.js': [
                        'app/app.module.js',
                        'app/app.config.js',
                        'app/core/core.module.js'
                    ]
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/core/**/*.js', 'app/view/**/*.js', '!app/core/google/*.js']
        },
        concat: {
            app: {
                src: [
                    'app/app.module.js',
                    'app/app.config.js',
                    'app/core/core.module.js',
                    'app/core/portfolio/portfolio.module.js',
                    'app/core/portfolio/portfolio.service.js',
                    'app/core/project/project.module.js',
                    'app/core/project/project.service.js',
                    'app/core/google/resume.module.js',
                    'app/core/google/resume.service.js',
                    'app/core/global-navigation/global-navigation.module.js',
                    'app/core/global-navigation/global-navigation.component.js',
                    'app/core/google/google-analytics-object.js',
                    'app/view/view.module.js',
                    'app/view/**/*.module.js',
                    'app/view/**/*.component.js',
                    '!app/**/*.spec.js',
                    '!app/bower_components/**/*.js'],
                dest: 'dist/js/app.js'
            },
            bower: {
                src: [
                    'app/bower_components/jquery/dist/jquery.min.js',
                    'app/bower_components/angular/angular.min.js',
                    'app/bower_components/angular-animate/angular-animate.min.js',
                    'app/bower_components/angular-resource/angular-resource.min.js',
                    'app/bower_components/angular-route/angular-route.min.js',
                    'app/bower_components/angular-touch/angular-touch.min.js',
                    'app/bower_components/angular-scroll/angular-scroll.min.js',
                    'app/bower_components/angulartics/dist/angulartics.min.js',
                    'app/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js'
                ],
                dest: 'dist/js/bower-components.min.js'
            },
            all: {
                src: ['dist/js/bower-components.min.js', 'dist/js/app.min.js'],
                dest:'dist/js/main.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle:false
            },
            app: {
                src: ['dist/js/app.js'],
                dest: 'dist/js/app.min.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'dist/css/app.css': 'app/less/app.less'
                }
            }
        },
        cssmin: {
            distribution: {
                files: [{
                    expand: true,
                    cwd: 'app/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        htmlmin: {
            distribution: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**/*.template.html'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['index.html'],
                        dest: 'dist/'
                    }
                ]
            },
            development: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['app/index.html', 'index.html'],
                    dest: 'dist'
                }]
            }
        },
        copy: {
            static: {
                files: [
                    {
                        expand:true,
                        cwd: 'app/',
                        src:['img/**', 'portfolioData/**', 'robots.txt', 'google015368be708b51fe.html'],
                        dest:'dist/'
                    },
                    {
                        expand:true,
                        cwd: 'app/bower_components/font-awesome',
                        src:['fonts/**'],
                        dest:'dist/'
                    }
                ]
            }
        },
        watch: {
            css: {
                files: 'app/**/*.less',
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['app/**/*.js', '!app/**/*.spec.js', '!app/bower_components/**/*.js', '!app/dist/**/*.js', '!app/dist/**/*.min.js'],
                tasks: ['jshint:all', 'concat:app', 'concat:bower', 'uglify:app', 'concat:all']
            },
            html: {
                files: ['app/index.html', 'app/**/*.template.html', 'app/portfolioData/**/*.html'],
                tasks: ['htmlmin:distribution', 'copy:static']
            },
            data: {
                files: ['app/portfolioData/**/*.json'],
                tasks: ['copy:static']
            }
        }
    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);
    // grunt.registerTask('dev', ['rebuild', 'express', 'watch']);

};