'use strict';

exports.register = function (server, options, next) {

    // fake data
    const bookmarks = [{
      "title": "CNN",
      "url": "http://cnn.com",
      "created": "2016-06-16T21:28:57.151Z",
      "upvotes": 1,
      "id": "5547fcf0-3409-11e6-9c89-a7791433fedf"
    }, {
      "title": "NYT",
      "url": "http://nytimes.com/",
      "created": "2016-06-20T23:34:25.759Z",
      "upvotes": 0,
      "id": "865566f0-373f-11e6-9319-fba74a258305"
    }];

// get all bookmarks
  server.route({
    method: 'GET',
    path: '/bookmarks',
    handler: function (request, reply) {

      return reply.view('index', {
        bookmarks: bookmarks
      });
    }
  });

// add new bookmark view
  server.route({
    method: 'GET',
    path: '/bookmarks/add',
    handler: function (request, reply) {

      return reply.view('form', {
        edit: false
      });
    }
  });

// add new bookmark route
  server.route({
    method: 'POST',
    path: '/bookmarks',
    handler: function (request, reply) {

      return reply.redirect('/bookmarks');
    }
  });

// edit bookmark view
  server.route({
    method: 'GET',
    path: '/bookmarks/{id}/edit',
    handler: function (request, reply) {

      return reply.view('form', {
        values: bookmarks[0],
        edit: true
      });
    }
  });

// update bookmark route
  server.route({
    method: 'POST',
    path: '/bookmarks/{id}',
    handler: function (request, reply) {

      return reply.redirect('/bookmarks');
    }
  });

// delete bookmark route
  server.route({
    method: 'GET',
    path: '/bookmarks/{id}/delete',
    handler: function (request, reply) {

      return reply.redirect('/bookmarks');
    }
  });

// upvote bookmark route
  server.route({
    method: 'GET',
    path: '/bookmarks/{id}/upvote',
    handler: function (request, reply) {

      return reply.redirect('/bookmarks');
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'routes-bookmarks'
};
