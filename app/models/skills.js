var db = require('../../config/db');

exports.getSkillList = function(done){
    db.get().query('SELECT skill,description,skills_img FROM skills',function(err,rows){
        if(err) return done(err)
        done(null,rows);
        })
    
}
exports.getSkillForProfile = function(id,done){
    //db.get().query('SELECT course_taken.course,year,season,skill,score FROM course_taken JOIN skill_helped ON course_taken.course = skill_helped.course WHERE student_id = ?', id, function(err,rows){
    db.get().query("SELECT course_taken.course,year,season,skill, score FROM course_taken JOIN (SELECT course,skill,avg(feedback) AS score FROM skill_improved GROUP BY skill,course) AS A ON course_taken.course = A.course WHERE student_id = ?",id,function(err,rows){
        if(err) return done(err)
        done(null,rows);
    })
}
