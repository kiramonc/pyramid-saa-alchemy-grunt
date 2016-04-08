// Encargado de cargar los plugins e incluir la configuracion de las tareas

module.exports = function(grunt){
    grunt.initConfig({
        uglify: {
            minimizar: {
                files: {
                    'video_store/static/components/js/scripts.min.js': ['video_store/static/js/*.js']
                }
            } // target: minimizar
        }, // uglify

        concat: {
            css: {
                src: ['video_store/static/css/*.css'],
                dest: 'video_store/static/components/css/combined.css'
            } // target: css
        }, // cssmin

        cssmin: {
            css: {
                src: 'video_store/static/components/css/combined.css',
                dest: 'video_store/static/components/css/combined.min.css'
            } // target: css
        }, // cssmin

        imagemin:{
            main:{
                files: [{
                    expand: true,
                    cwd: 'video_store/static/img/',
                    src: ['**/*.{png,jpg,gif,.svg}'],
                    dest: 'video_store/static/components/img/'
                }]

            } // target: main
        }, // imagemin

        browserSync: {
            dev: {
                bsFile: {
                    src: [
                        'video_store/static/*.css',
                        'video_store/static/components/img/*.jpg',
                        'video_store/static/components/img/*.png',
                        'video_store/static/components/img/*.gif',
                        'video_store/static/components/js/*.js',
                    ]
                },

                options: {
                    watchTask: true,
                    debugInfo: true,
                    logConnections: true,
                    notify: true,
                    ghostMode: {
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }

            } // dev
        }, // browserSync

        watch: {
            scripts: {
                files: ['video_store/static/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                }
            }, //scripts

            image: {
                files: ['video_store/static/*.{png,jpg,gif}'],
                tasks: ['newer:imagemin'],
                options: {
                    spawn: false,
                }
            } //image

        } //watch
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');     // minimizar js
    grunt.loadNpmTasks('grunt-contrib-concat');     // concatena archivos en uno solo
    grunt.loadNpmTasks('grunt-contrib-cssmin');     // minimizar css
    grunt.loadNpmTasks('grunt-newer');              // detectar cambios
    grunt.loadNpmTasks('grunt-contrib-imagemin');   // optimizar imagenes
    grunt.loadNpmTasks('grunt-contrib-watch');      // vigilar los cambios
    grunt.loadNpmTasks('grunt-browser-sync');       // sincronizar pag en el navegador

    grunt.registerTask('default', ["uglify", "imagemin", "concat", "cssmin"]); // tareas por defecto
}