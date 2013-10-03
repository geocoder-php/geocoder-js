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
        'src/GeocoderJS.js',
        'src/providers/ProviderBase.js',
        'src/Geocoded.js',
        'src/GeoJSONDumper.js',
        'src/providers/*.js'
      ],
      options: {
        specs: ['spec/*.js', 'spec/providers/*.js'],
        helpers : 'spec/helpers/*.js',
        keepRunner: true
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
