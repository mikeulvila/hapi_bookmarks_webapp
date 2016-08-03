'use strict';

exports.register = function(server, options, next) {

  server.auth.strategy('session', 'cookie', 'optional', {
    password: 'eGenCG7wGdzeiKISE7Ftt2A7',
    isSecure: false
  })
  return next();
};

exports.register.attributes = {
  name: 'auth'
};
