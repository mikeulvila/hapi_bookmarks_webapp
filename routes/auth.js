'use strict';

exports.register = function(server, options, next) {

  // mock payload
  const loginPayload = {
    "token": "450ca305d7042c0a0f19",
    "username": "john"
  };

  server.route({
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {

      return reply.view('login');
    }
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: function (request, reply) {

      request.cookieAuth.set(loginPayload);

      return reply.redirect('/bookmarks');
    }
  });

  server.route({
    method: 'GET',
    path: '/logout',
    handler: function (request, reply) {

      request.cookieAuth.clear();

      return reply.redirect('/bookmarks');
    },
    config: {
      auth: 'session'
    }

  });

  return next();
};

exports.register.attributes = {
  name: 'routes-auth'
};
