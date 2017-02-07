module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            development: {
                src: 'app/js/main.js',
                dest: 'dist/js/main.min.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ['app/less']
                },
                files: {
                    'app/css/app.css': 'app/less/app.less'
                }
            }
        },
        cssmin: {
            distribution: {
                files: [{
                    expand: true,
                    cwd: 'app/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'app/css',
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
                files: {
                    'dist/index.html': 'app/index.html'
                }
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
        watch: {
            css: {
                files: 'app/**/*.less',
                tasks: ['less', 'cssmin']
            },
            js: {
                files: 'app/js/*.js',
                tasks: ['uglify:development']
            },
            html: {
                files: 'app/index.html',
                tasks: 'htmlmin:development'
            }
        }
    });

    // Load plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    // grunt.registerTask('default', ['uglify']);
    // grunt.registerTask('dev', ['rebuild', 'express', 'watch']);

};