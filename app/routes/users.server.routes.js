var User = require('../../app/controllers/users.server.controller');
var Course = require('../../app/controllers/courses.server.controller');
module.exports = function (app,passport) {
/*    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });
*/
    // process the login form
    app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      console.log(req.body);
      res.contentType('json');
    if (err)
      {
	  console.log("error");
          res.send( { message:"error" })
	  
      }
    if (!user) {
        console.log("No! Here is the error");
        res.send({message:"error"});
        //return res.redirect('/login');
    }
      else{
    req.logIn(user, function(err) {
        console.log(user);
      if (err)
        {
            console.log("No really... here's the error");
	    res.send({message : "error"});
        }
        else
        {
            console.log("here");
            res.send({message:"successful"});
	    
        }
    })
        //return res.redirect('/users/' + user.username);
    };
  })(req, res, next);
})	   


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup',passport.authenticate('local-signup'),  function(req, res, err)
	     {
		 console.log(req.body);
		 console.log(req.user);
		 console.log("Here I am, Mr. Universe");
		 console.log(req.isAuthenticated());
		 console.log(err);
		 if (req.isAuthenticated())
		     {
			 res.send({message: "successful"});
		     }
	});

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.send( {
            user: req.user // get the user out of session and pass to template
        });
    });
    //maybe not the correct way
    app.get('/profile/userInfo', isLoggedIn, User.showCourses);
    //add course
    app.post('/profile/addSelectedCourses',isLoggedIn,User.addCourses);
    app.post('/addFeedBack',isLoggedIn,User.sendFeedback);
    
    app.get('/courses/:course',function(req,res){
	console.log("I am being called boi");
	Course.showCoursePage(req,res);
    })
     app.get('/courses/:course/info',isLoggedIn,function(req,res){
        Course.showCourseInfo(req,res);
    })
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
