module.exports = function (grunt) {
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};
