                        /**
 * 
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var loginDatabase = "mongodb://localhost:27017/ebay";
var mongo = require('./mongo');
var bcrypt = require('bcrypt');

module.exports = function(passport) {
	console.log("here");
	passport.use('signin', new LocalStrategy(
			function(username, password, done) {

				var dt = new Date();
				var myPlaintextPassword = password;

				mongo.connect(loginDatabase, function() {

					console.log('CONNECTED TO MONGO in passportJS');
					var collection_login = mongo.collection('users');
					var json_responses;

					collection_login.findOne({
						username : username
					}, function(err, user) {
						if (user) {
							var password = user.password;

							console.log("The password is: " + password);
							console.log("The username is: " + username);
							console.log(user);

							if (bcrypt.compareSync(myPlaintextPassword,
									password)) {

								done(null, user);
							} else {
								done(null, false);
							}

						} else {
							done(null, false);
						}
					});

				

				});

			}));
};