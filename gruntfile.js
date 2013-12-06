module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    uglify: {
      files: {
        src: [
          'src/GeocoderJS.js',
          'src/providers/ProviderBase.js',
          'src/Geocoded.js',
          'src/GeoJSONDumper.js',
          'src/GeocoderProviderFactory.js',
          'src/ExternalURILoader.js',
          'src/providers/*.js'
        ],
        dest: 'dist/geocoder.js',
        beautify: true,
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
        'src/GeocoderProviderFactory.js',
        'src/ExternalURILoader.js',
        'src/providers/*.js'
      ],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('default', ['test', 'build']);
};
