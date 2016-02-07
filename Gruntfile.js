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
            },
            images: {
                expand: true,
                cwd: '<%= config.source %>/images/',
                src: ['*.jpg','*.gif','*.png'],
                dest: '<%= config.app %>/images/',
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

        uglify: {
            js: {
                files: {
                    '<%= config.app %>/js/scripts.min.js': ['<%= config.app %>/js/scripts.js']
                }
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
            dev: ['<%= config.app %>/sass','<%= config.app %>/css/styles.min.css','<%= config.app %>/js/scripts.min.js'],
            live: ['<%= config.app %>/sass','<%= config.app %>/css/*.css','<%= config.app %>/css/*.css.map','!<%= config.app %>/css/styles.min.css','<%= config.app %>/js/*.js', '!<%= config.app %>/js/scripts.min.js']
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
            all: ['<%= config.app %>/js/*.js','!<%= config.app %>/js/scripts.min.js']
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
        },

        watch: {
            options:{
                livereload: true
            },
            dev:{
                files: ['<%= config.source %>/sass/*.sass','<%= config.source %>/scripts/*.js','<%= config.source %>/*.html'],
                tasks: ['sass:dev','copy:js','jshint','copy:html','injector']
            },
            live:{
                files: ['<%= config.source %>/sass/*.sass','<%= config.source %>/scripts/*.js','<%= config.source %>/*.html'],
                tasks: ['concat:css','sass:live','copy:js','concat:js','jshint','uglify','copy:html','clean:live','injector']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['copy','sass:dev','clean:dev','injector','jshint','browserSync','watch:dev']);
    grunt.registerTask('live', ['htmlmin','copy:images','concat','jshint','uglify','sass:live','clean:live','injector','browserSync','watch:live']);

};