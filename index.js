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
}, {
  register: require('vision')
}, {
  register: require('hapi-auth-cookie')
}, {
  register: require('./plugins/error')
}, {
  register: require('./plugins/auth')
}, {
  register: require('./routes/bookmarks')
}, {
  register: require('./routes/auth')
}, {
  register: require('blipp')
}, {
  register: require('lout') // for docs go to /docs in browser
}], (err) => {

  if (err) {
      throw err;
  }

  // serve static assests
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

  // use handlebars as template engine
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './templates',
    helpersPath: './templates/helpers',
    layoutPath: './templates/layouts',
    layout: true,
    isCached: false, // should be true in production
    context: (request) => {
      return {
        user: request.auth.credentials
      }
    }
  });

  // redirect / to /bookmarks
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

       return reply.redirect('/bookmarks');
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
