var Auth = require('./auth.js')

exports.register = function(server, options, next){
	server.route([
    {
      method: 'GET',
      path: '/',
      handler: function(request, reply){
        return reply.view("index");
      }
    },
    {
      method: 'GET',
      path: '/addRecipe',
      handler: function(request, reply){
        Auth.authenticated(request, function(result){
          if (!result.authenticated) {
            return reply("You are not authorized.");
          }
          return reply.view("addRecipe");
        });
      }
    },
    {
      method: 'GET',
      path: '/findRecipe',
      handler: function(request, reply){
        return reply.view("findRecipe");
      }
    },
    {
      method: 'GET',
      path: '/ingredientMatcher',
      handler: function(request, reply){
        return reply.view("ingredientMatcher");
      }
    },
    {
      method: 'GET',
      path: '/signPage',
      handler: function(request, reply){
        return reply.view("signPage");
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