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
        },
        validate: {
          payload: {
            recipe: {
              name: Joi.string().min(10).required(),
              picture: Joi.string().uri().required(),
              ingredients: Joi.array().min(1).required(),
              directions: Joi.array().min(1).required(),
              preptime: Joi.string().allow('').optional(),
              cookingtime: Joi.string().required()
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/recipes',
      handler: function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('recipes').find().toArray(function(err, recipes){
          if (err) {return reply("Internal MongoDB error", err);}
          
          reply(recipes);
        })
      }
    },
    {
      method: 'GET',
      path: '/recipes/search/ingredients',
      handler: function(request, reply) {
        var ingredients=request.query.ingredients;
        findIngredients = '"';
        findIngredients += (ingredients.replace(',', '" "'));
        findIngredients += '"';
        
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('recipes').find({ $text: { $search: findIngredients } }).toArray(function(err, ing){
          if (err) {return reply("Internal MongoDB error", err);}
          
          reply(ing);
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