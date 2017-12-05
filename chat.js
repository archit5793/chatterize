var User = require('./user');

module.exports = function(io){
	return {
		getRegister:function(req,res){
			if(req.session !== null && req.session !== undefined && req.session.username!==null && req.session.username!==undefined){
				res.redirect('/home');
			}else {
				res.render('register');
			}
		},

		register:function(req,res){
			var username = req.body.username;
			var password = req.body.password;
			var user = new User({username:username,password:password});
			user.save(function(err){
				if(err){
					throw err;
				}
				req.session.username = username;
				res.redirect('/home');

			});

		},

		getLogin:function(req,res){
			if(req.session !== null && req.session !== undefined && req.session.username!==null && req.session.username!==undefined){
				res.redirect('/home');
			}else {
				res.render('login');
			}
		},

		login:function(req,res){
			var username = req.body.username;
			var password = req.body.password;
			User.findOne({username:username}).exec(function(err,user){
				if(err) {

					throw err;

				}
				if(!user){

					res.redirect('/login');

				}else if(password===user.password){

					req.session.username = username;
					res.redirect('/home');

				}else {

					res.redirect('/login');
				}
			});
		},

		home:function(req,res){
			if(req.session !== null && req.session !== undefined && req.session.username!==null && req.session.username!==undefined){
				var clientname = req.session.username;
				// io.set("authorization", function(data, accept) {
				//   if (req.session!==null) {
				//     data.username = req.session.username
				//   } else {
				//     return accept('No cookie transmitted.', false);
				//   }
				//   accept(null, true);
				// });
				var users = [];
				io.on('connection',function(newclient){
					//newclient.username = newclient.request.
					//console.log(newclient.request);
					var allusernames = [];
					
					
					var allusers = Object.keys(io.engine.clients);
					newclient.username = clientname;
					// var allusernames = io.sockets.sockets.map(function(e) {
    	// 					return e.username;
					// });
					console.log(allusers);
					for(var i=0;i<allusers.length;i++){
						allusernames.push(io.sockets.sockets[allusers[i]].username);
					}
					console.log(allusernames);
					io.of('/').emit('list',{userlist:allusers,usernames:allusernames});
					// sending to individual socketid (private message)
  					//socket.to(<socketid>).emit('hey', 'I just met you');
  					// newclient.on('privately',function(data){
  					// 	data
  					// });

  					// newclient.emit('show')
				});

				res.render('home');
			}else {
				res.redirect('/login');
			}
		},

		logout:function(req,res){
			req.session.destroy();
			res.redirect('/login');
		}
	}

}