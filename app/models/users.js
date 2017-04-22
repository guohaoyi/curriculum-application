var db = require('../../config/db');
var bcrypt = require("bcrypt");

exports.getAllUsers = function(done){
    db.get().query('SELECT * FROM login_info',function(err,rows){
        if(err) return done(err)
        done(rows)
    });
}
exports.create = function(email,pw,done){
    pw = bcrypt.hashSync(pw,10);
    var values = [email,pw];
    db.get().query('INSERT INTO user (email,password) VALUES(?,?)',values,function(err,result){
        
        if(err) return done(err)
        db.get().query('INSERT INTO student (id) VALUES(?)',result.insertId,function(err,rows){
            if(err){ 
                console.log('oops');
                console.log(err);
                return done(err)}
            console.log("insertResult: "+ result.insertId)
            done(null,result.insertId);
        })
        
        
    })
}
exports.exist = function(email,done){
     db.get().query('SELECT * FROM user WHERE email = ?',email,function(err,rows){
        if (err) return done(err)
        return done(null,rows);
     })
}

exports.find = function(email,done){

    db.get().query('SELECT * FROM user WHERE email = ?',email,function(err,rows){
        if (err) return done(err)
        if(rows[0] == null) return done(rows);
        exports.find_skills(rows[0].id,function(err,results){
            if(err) return done(err)
            rows[0].skills = results
            done(null,rows);
        })
        //done(null,rows)
    });
}
exports.find_id = function(id,done){

    db.get().query('SELECT * FROM user WHERE id = ?',id,function(err,rows){
        if (err) return done(err)
        done(null,rows)
    });
}
exports.course_taken = function(id,done){
    db.get().query('SELECT * FROM course_taken WHERE student_id = ?',id,function(err,rows){
        if (err) return done(err)
        done(null,rows)
    });
}

exports.find_skills = function(id,done){
    db.get().query("SELECT skill,SUM(a.s) as score FROM (SELECT course,skill,avg(feedback) AS s FROM skill_improved GROUP BY course,skill) AS a JOIN (SELECT id,course FROM user JOIN course_taken ON user.id = course_taken.student_id WHERE user.id = ?) AS b ON a.course = b.course GROUP BY skill",id,function(err,rows){
        if(err) return done(err)
        done(null,rows)
    });
}
exports.add_course = function(id,course_name,year,season,done){
    db.get().query("INSERT INTO course_taken Values(?,?,?,?)",[id,course_name,year,season],function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}

exports.add_feedback = function(id,course,skill,feedback,done){   
    db.get().query("INSERT INTO skill_improved Values(?,?,?,?)",[id,course,skill,feedback],function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}

exports.check_feedback = function(id,course,done){
    db.get().query("SELECT * FROM skill_improved WHERE id = ? AND course = ?",[id,course],function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}
exports.change_feedback = function(id,course,skill,feedback,done){
    /*console.log("changing feedback");
    console.log("id "+id);
    console.log("course "+course);
    console.log("skill "+skill);
    console.log("feedback "+feedback);*/
    db.get().query("UPDATE skill_improved SET feedback = ? WHERE id =? AND course =? AND skill = ?",[feedback,id,course,skill],function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}

exports.clear_feedback = function(id,course,done){
    db.get().query("UPDATE skill_improved SET feedback = 1 WHERE id =? AND course =?",[id,course],function(err,rows){
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,rows);
    })
}
