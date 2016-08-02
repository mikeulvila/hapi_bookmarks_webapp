'use strict';

const Hapi = require('hapi');

//Create server and connection
const server = new Hapi.Server({
  app: {
    apiBaseUrl: 'http://localhost:3000'
  }
});
server.connection({
    port: 4000
});


//Register good plugin and start the server
server.register([{
  register: require('good'),
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
            log: '*',
            response: '*'
        }]
      }, {
          module: 'good-console'
      }, 'stdout']
    }
  }
}, {
  register: require('inert')
}], (err) => {

  if (err) {
      throw err;
  }

  // set route
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true
      }
    }
  });

  // Starting the server
  server.start((err) => {

      if (err) {
          throw err;
      }

      console.log('Server running at:', server.info.uri);
  });
});
