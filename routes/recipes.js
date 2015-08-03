var Bcrypt = require('bcrypt');
var Joi = require('joi');

// Defining the plugin
exports.register = function(server, options, next){
	// Define routes
  server.route([
    {
      method: 'POST',
      path: '/recipes',

      config: {
        handler: function(request, reply) {
          var db = request.server.plugins['hapi-mongodb'].db;
          var recipe = request.payload.recipe;

            // inserting a user document into DB
            db.collection('recipes').insert(recipe,function(err,writeResult){
              if (err) {return reply("Internal MongoDB error", err);}

              reply(writeResult);
            })

        }
      }
    },
    {
      method: 'GET',
      path: '/recipes',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        //db.users.find() also works
        db.collection('recipes').find().toArray(function(err, recipes){
          if (err) {return reply("Internal MongoDB error", err);}
          
          reply(recipes);
        })
      }
    }
  ]);
	next(); // DO NOT FORGET THIS
};

// Defining the description of the plugin
exports.register.attributes = {
	name: 'recipes-routes',
	version: '0.0.1'
}