var db = require('../../config/db');

exports.showCourse = function(course,done){
    db.get().query('SELECT * FROM course Where course_name = ?',course,function(err,rows){
        if(err) return done(err)
        done(null,rows);
        /*db.get().query('SELECT * FROM skill_helped where course = ?',course,function(err,results){
            if(err) return done(err)
            var r = [rows[0],results];
            done(null,r);
        })*/
    });
}

exports.courseList = function(done){
    db.get().query('SELECT * FROM course',function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}

exports.studentCourseList = function(id,done){
    db.get().query('SELECT course_name,course_title,department,student_id AS id FROM course LEFT JOIN (SELECT * FROM course_taken WHERE student_id = ?) AS table_a on course.course_name = table_a.course',id,function(err,rows){
        if(err){
            console.log(err);
            return done(err)
        }
        done(null,rows);
        
    })
}

exports.courseInfo = function(course,done){
    console.log(course);
    db.get().query("select course,skill,avg(feedback) as score, count(*) as votes from course join skill_improved on course.course_name = skill_improved.course where course = ? GROUP BY skill;",course,function(err,rows){
        if(err){
            console.log(err);
            return done(err)
        }
        done(null,rows);
    })
}



