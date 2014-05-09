module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    /**
     * Parses the given components path and returns a list with the main file for each bower dependency.
     * @param {string} componentsPath path to Bower components
     * @returns {Array} list of files
     */
    function findBowerMainFiles(componentsPath) {
        var files = [];

        fs.readdirSync(componentsPath).filter(function (file) {
            return fs.statSync(componentsPath + '/' + file).isDirectory();
        }).forEach(function (packageName) {
            var bowerJsonPath = componentsPath + '/' + packageName + '/bower.json';
            if (fs.existsSync(bowerJsonPath)) {
                var json = grunt.file.readJSON(bowerJsonPath);
                files.push(packageName + '/' + json.main);
            }
        });

        return files;
    }
    
    var path = require('path'),
        fs = require('fs'),
        bowerMainFiles = findBowerMainFiles(path.resolve(__dirname, 'bower_components'));
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            app: {
                rjsConfig: '<%= appDir %>/config.js'
            }
        },
        clean: {
            build: 'build'
        },
        copy: {
            scripts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appDir %>',
                        src: ['**/*.js'],
                        dest: '<%= webRoot %>/js/<%= appName %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/',
                        src: bowerMainFiles,
                        dest: '<%= webRoot %>/js/lib',
                        filter: 'isFile'
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= appDir %>',
                        src: ['**/*.js'],
                        dest: 'build/<%= appName %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/',
                        src: bowerMainFiles,
                        dest: 'build/lib',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jshint: {
            app: ['<%= appDir %>/**/*.js'],
            gruntFile: ['Gruntfile.js'],
            options: {
                'curly': true,
                'eqeqeq': true,
                'eqnull': true,
                'expr': true,
                'latedef': true,
                'onevar': true,
                'noarg': true,
                'node': true,
                'trailing': true,
                'undef': true,
                'unused': true,
                'indent': 4,
                'predef': ['document', 'define']
            }
        },
        requirejs: {
            app: {
                options: {
                    appDir: 'build/',
                    baseUrl: './',
                    optimize: "uglify2",
                    name: 'lib/almond/almond',
                    dir: '<%= webRoot %>/js'
                }
            }
        },
        watch: {
            scripts: {
                files: ['<%= appDir %>/**/*.js'],
                tasks: ['jshint:app', 'copy:scripts'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('init', 'Initializes the project.', function () {
        grunt.task.run('bower');
    });
    grunt.registerTask('build', ['copy:build', 'requirejs', 'clean:build']);

};