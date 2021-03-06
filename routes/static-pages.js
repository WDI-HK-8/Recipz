var Auth = require('./auth.js')

exports.register = function(server, options, next){
	server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("signPage");
          }
          return reply.view("index");
        });
      }
    },
    {
      method: 'GET',
      path: '/addRecipe',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("notauthorized");
          }
          return reply.view("addRecipe");
        });
      }
    },
    {
      method: 'GET',
      path: '/findRecipe',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("notauthorized");
          }
          return reply.view("findRecipe");
        });
      }
    },
    {
      method: 'GET',
      path: '/ingredientMatcher',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("notauthorized");
          }
          return reply.view("ingredientMatcher");
        });
      }
    },
    {
      method: 'GET',
      path: '/findTerms',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("notauthorized");
          }
          return reply.view("findTerms");
        });
      }
    },
    {
      method: 'GET',
      path: '/darecipe',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply.view("notauthorized");
          }
          return reply.view("darecipe");
        });
      }
    },
    {
      method: 'GET',
      path: '/public/{path*}',
      // /public/application.js
      // /public/custom.css
      handler: {
        directory: {
          path: 'public'
        }
      }
    }
	])

	next();
}

exports.register.attributes = {
	name: 'static-pages-routes',
	version: '0.0.1'
}