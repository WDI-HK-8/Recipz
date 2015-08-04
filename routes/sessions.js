var Bcrypt = require('bcrypt');
var Auth = require('./auth');

exports.register = function(server, options, next){

  server.route([
    {
      method: 'POST',
      path: '/sessions',
      handler: function(request, reply){
        
        var db = request.server.plugins['hapi-mongodb'].db;
        
        var user = request.payload.user;

        db.collection('users').findOne({username:user.username},function(err,userMongo){
          if(err) {return reply('Internal MongoDB error')}

          if(userMongo === null){
            return reply({userExist: false});
          }

          Bcrypt.compare(user.password, userMongo.password, function(err,same){
            if(!same){
              return reply({authorized: false})
            }

            var randomKeyGenerator = function(){
              return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
            }

            var session = {
              user_id: userMongo._id,
              session_id: randomKeyGenerator()
            }

            db.collection('sessions').insert(session, function(err, writeResult){
              if(err) {return reply('Internal MongoDB error')}

              request.session.set('recipz_session', session);

              reply({authorized:true})
            })
          })
        })
      }
    },
    {
      method: 'GET',
      path: '/authenticated',
      handler: function(request, reply){
        var callback = function(result){
          reply (result)
        }

        Auth.authenticated(request,callback)
        
      }
    }, {
      method: 'DELETE',
      path: '/sessions',
      handler: function(request, reply){
        var cookie = request.session.get('recipz_session');
        var db = request.server.plugins['hapi-mongodb'].db;

        if (!cookie) {
          reply ({"message": "Already logged out!"})
        }

        db.collection('sessions').remove({session_id: cookie.session_id}, function(err, writeResult){
          if(err) {return reply("Internal MongoDB error", err);}

          reply(writeResult);
        })
        
      }
    }

    ])
  next();
}

exports.register.attributes = {
  name: 'sessions-route',
  version: '0.0.1'
}