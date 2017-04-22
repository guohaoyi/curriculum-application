path = require('path');
var Course = require('../../app/controllers/courses.server.controller');
module.exports = function(app){
    /** 
    app.get('/course_feedback',function(req,res){
        res.sendFile(path.join(__dirname, '../../public', 'FeedbackPage.html'));
    })
    **/
    app.get('/course_feedback/:course',isLoggedIn,function(req,res){
        res.render('course_feedback.ejs',{
            course:req.params.course
        });
    });

    app.get('/courseList',function(req,res){
        Course.showCourseList(req,res);
    });
    app.get('/studentCourseList',isLoggedIn,function(req,res){
        Course.showStudentCourseList(req,res)
    })
    app.get('/courseSearch',isLoggedIn,function(req,res){
        res.render('course_browser.ejs');
    })
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
