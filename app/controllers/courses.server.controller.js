var Course = require('../models/courses');
exports.showCoursePage = function(req,res){
    var course = req.params.course;
    //console.log(course);
    Course.showCourse(course,function(err,result){
        //console.log(result);
        res.render('course.ejs',{
            course:result[0]
            //skills:JSON.stringify(result[1])
        });
    });
}
exports.showCourseList = function(req,res){
    Course.courseList(function(err,result){
        res.send(result);
    })
}

exports.showStudentCourseList = function(req,res){
    Course.studentCourseList(req.user.id,function(err,result){
        res.send(result)
    })
}
exports.showCourseInfo = function(req,res){
    //console.log(req.params.course);
    Course.courseInfo(req.params.course,function(err,result){
        res.send(result);
    })
}
