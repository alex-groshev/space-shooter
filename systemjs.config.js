(function (global) {
  System.config({
    paths: {
      'npm:': 'node_modules/'
    },
    map: {
      app: 'app'
    },
    packages: {
      app: {
        main: './app.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
