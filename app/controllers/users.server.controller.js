var User = require('../models/users');
exports.showCourses = function (req, res) {
    var id = req.user.id;
    User.course_taken(id, function (err, result) {
        User.find_skills(id, function (err, rows) {
            res.send([result, rows]);
        })

    });
};
exports.addCourses = function (req, res) {
    var id = req.user.id;
    var courses = req.body.data;
    for (var i in courses) {
        console.log(id, courses[i].course_name, parseInt(courses[i].year), courses[i].season);
        User.add_course(id, courses[i].course_name, parseInt(courses[i].year), courses[i].season, function (err, rows) {
            return null;
        })
    }
    res.render('profile.ejs', {
        user: req.user
    });
};
exports.sendFeedback = function (req, res) {
    User.check_feedback(req.user.id, req.body.course, function (err, rows) {

        if (rows.length == 0) {
            //first time 
            User.add_feedback(req.user.id, req.body.course,
                "Communication", 1,
                function (err, rows) {
                    User.add_feedback(req.user.id, req.body.course,
                        "Creativity", 1,
                        function (err, rows) {
                            User.add_feedback(req.user.id, req.body.course,
                                "Critical Thinking", 1,
                                function (err, rows) {
                                    User.add_feedback(req.user.id, req.body.course,
                                        "Intellectual  Openness", 1,
                                        function (err, rows) {
                                            User.add_feedback(req.user.id, req.body.course,
                                                "Intellectual  Openness", 1,
                                                function (err, rows) {
                                                    User.add_feedback(req.user.id, req.body.course,
                                                        "Perspective Taking", 1,
                                                        function (err, rows) {
                                                            User.add_feedback(req.user.id, req.body.course,
                                                                "Problem Solving", 1,
                                                                function (err, rows) {
                                                                    User.add_feedback(req.user.id, req.body.course,
                                                                        "Social Awareness and Empathy", 1,
                                                                        function (err, rows) {
                                                                            User.add_feedback(req.user.id, req.body.course,
                                                                                "Teamwork", 1,
                                                                                function (err, rows) {
                                                                                    console.log(req.body.data);
                                                                                    User.change_feedback(req.user.id, req.body.course, req.body.data[0][0], req.body.data[0][1], function (err, rows) {
                                                                                        return null;
                                                                                    });
                                                                                    User.change_feedback(req.user.id, req.body.course, req.body.data[1][0], req.body.data[1][1], function (err, rows) {
                                                                                        return null;
                                                                                    });

                                                                                    User.change_feedback(req.user.id, req.body.course, req.body.data[2][0], req.body.data[2][1], function (err, rows) {
                                                                                        return null;
                                                                                    });
                                                                                    return null;
                                                                                });
                                                                            return null;
                                                                        });
                                                                    return null;
                                                                });
                                                            return null;
                                                        });
                                                    return null;
                                                });
                                            return null;
                                        });
                                    return null;
                                });
                            return null;
                        });
                    return null;
                });
        } else {
            //not first time
            User.clear_feedback(req.user.id, req.body.course, function (err, rows) {
                console.log(req.body.data);
                User.change_feedback(req.user.id, req.body.course, req.body.data[0][0], req.body.data[0][1], function (err, rows) {
                    return null;
                });
                User.change_feedback(req.user.id, req.body.course, req.body.data[1][0], req.body.data[1][1], function (err, rows) {
                    return null;
                });

                User.change_feedback(req.user.id, req.body.course, req.body.data[2][0], req.body.data[2][1], function (err, rows) {
                    return null;
                });
                return null;
            })
        }
    })
}