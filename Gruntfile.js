module.exports = function(grunt) {

    var config = {
        source: 'source',
        app: 'app'
    }

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: config,

        copy: {
            html: {
                src: '<%= config.source %>/index.html',
                dest: '<%= config.app %>/index.html'
            },
            js: {
                expand: true,
                cwd: '<%= config.source %>/scripts/',
                src: '*.js',
                dest: '<%= config.app %>/js/',
                flatten: true,
                filter: 'isFile'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    '<%= config.app %>/index.html': '<%= config.source %>/index.html'
                }
            }
        },

        concat: {
            css: {
                src: ['<%= config.source %>/sass/*.sass'],
                dest: '<%= config.app %>/sass/styles.sass'
            },
            js: {
                src: ['<%= config.source %>/scripts/*.js'],
                dest: '<%= config.app %>/js/scripts.js'
            }
        },

        sass: {
            dev:{
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>/sass',
                    src: ['*.sass'],
                    dest: '<%= config.app %>/css',
                    ext: '.css'
                }]
            },
            live:{
                options:{
                    style: 'compressed'
                },
                files: {
                    '<%= config.app %>/css/styles.min.css': '<%= config.app %>/sass/styles.sass'
                }
            }
        },

        clean: {
            sass: ['<%= config.app %>/sass'],
            css: ['<%= config.app %>/css/*.css','<%= config.app %>/css/*.css.map','!<%= config.app %>/css/styles.min.css'],
            js: ['<%= config.app %>/js/*.js', '!<%= config.app %>/js/scripts.js']
        },

        injector: {
            options: {
                addRootSlash: false,
                ignorePath:'<%= config.app %>/',
                template: '<%= config.app %>/index.html'
            },
            local_dependencies: {
                files: {
                    '<%= config.app %>/index.html': ['<%= config.app %>/js/*.js', '<%= config.app %>/css/*.css']
                }
            }
        },

        jshint: {
            all: ['<%= config.app %>/js/*.js']
        },

        watch: {
            options:{
                livereload: true
            },
            sass: {
                files: '<%= config.source %>/sass/*.sass',
                tasks: ['sass:dev']
            },
            scripts: {
                files: '<%= config.source %>/scripts/*.js',
                tasks: ['copy:js','jshint']
            },
            html: {
                files: '<%= config.source %>/*.html',
                tasks: ['copy:html','injector']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= config.app %>/css/*.css',
                        '<%= config.app %>/js/*.js',
                        '<%= config.app %>/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './<%= config.app %>'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['copy','sass:dev','injector','jshint','browserSync','watch']);
    grunt.registerTask('live', ['htmlmin','concat','sass:live','clean','injector']);

};