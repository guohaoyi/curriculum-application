var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/users');
var bcrypt = require("bcrypt");

module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.find_id(id, function (err, rows) {
            done(err, rows[0]);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.exist(email, function (err, rows) {
                
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    //if no user with that email
                    var newUserMysql = new Object();

                    newUserMysql.email = email;
                    newUserMysql.password = password; // use the generateHash function in our user model
                    //console.log(email);
                    //console.log(password);
                    User.create(email, password, function (err, rows) {
                        newUserMysql.id = rows;
                        return (done(null, newUserMysql));
                    });
                }

            });
            /*
        connection.query("select * from users where email = '"+email+"'",function(err,rows){
			*/
        }));
    //local login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req,email,password,done){
	console.log("I am trying to work");
        User.find(email,function(err,rows){
            if(rows == null)
            {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if(!(bcrypt.compareSync(password,rows[0].password))){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
            return done(null,rows[0]);
        });
    }
    ));
};
