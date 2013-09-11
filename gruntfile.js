module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    uglify: {
      files: {
        src: 'src/*.js',
        dest: 'dist/geocoder.js',
        flatten: true,
      },
      watch: {
        js: {files: 'src/*.js', tasks: ['uglify'] },
      }
    },
    jasmine: {
      src: [
        'src/ProviderBase.js',
        'src/Geocoded.js',
        'src/GeoJSONDumper.js',
        'src/GoogleProvider.js'
      ],
      options: {
        specs: 'spec/*.js'
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js',
        'spec/*.js'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test']);
};
