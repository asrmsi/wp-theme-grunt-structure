module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                // Include plugins whichever plugins you want. Keep an eye on the order.
                //  'js/NAME.js',
                //  'js/plugins.dev.js'  
                ],
            dest: 'js/plugins.js',
            }
        },

        uglify: {
            dist: {
                files: {
                    // I like to keep the jQuery library separate from the plugins
                    'js/plugins.min.js': 'js/plugins.js',
                    'js/jquery.min.js': 'js/jQuery.js'
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'img/o/'
                }]
            }
        },

        compass: {
            dist: {                   // Target
              options: {              // Target options
                sassDir: 'sass',
                cssDir: '',
                require: [
                    // Add in any gems you want just like in config.rb
                    //  'sassy-buttons',
                ],
                environment: 'development'
              }
            }
        },

        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat'),
    grunt.loadNpmTasks('grunt-contrib-uglify'),
    grunt.loadNpmTasks('grunt-contrib-imagemin'),
    grunt.loadNpmTasks('grunt-contrib-compass'),
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass', 'watch']);
};
