module.exports = function (grunt) {
  'use strict';

  var srcFiles = [
    'src/GeocoderJS.js',
    'src/providers/ProviderBase.js',
    'src/Geocoded.js',
    'src/GeoJSONDumper.js',
    'src/GeocoderProviderFactory.js',
    'src/ExternalURILoader.js',
    'src/providers/*.js'
  ];

  grunt.initConfig({
    uglify: {
      develop: {
        src: srcFiles,
        dest: 'dist/geocoder.js',
        options: {
          beautify: true
        }
      },
      production: {
        src: srcFiles,
        dest: 'dist/geocoder.min.js',
        options: {}
      }
    },
    jasmine: {
      src: srcFiles,
      options: {
        specs: ['spec/*.js', 'spec/providers/*.js'],
        helpers : 'spec/helpers/*.js',
        keepRunner: true,
        outfile: 'spec/runner.html',
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js',
        'spec/*.js'
      ]
    },
    complexity: {
      generic: {
        src: ['src/**/*.js'],
        options: {
          cyclomatic: [10, 30, 50],          // or optionally a single value, like 3
          halstead: [25, 30, 40],           // or optionally a single value, like 8
          maintainability: 100
        }
      }
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');

  grunt.registerTask('test', ['jshint', 'complexity', 'jasmine']);
  grunt.registerTask('ci', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['test', 'build']);
};
