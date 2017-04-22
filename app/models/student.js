var db = require('../../config/db');

exports.updateStudentInfo = function(id,student,done){
    var values = [student.firstName,student.lastName,student.major1,student.major2,student.minor,student.year,id];
    db.get().query("UPDATE student SET first_name = ?, last_name = ?, major1 = ?, major2 = ?, minor = ?, year = ? WHERE id = ?",values,function(err,rows){
        if(err) return done(err)
        done(rows);
    })

}