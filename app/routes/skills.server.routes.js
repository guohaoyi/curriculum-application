var Skill = require('../../app/controllers/skills.server.controller');
module.exports = function(app){
    app.get('/skillList',Skill.getSkillList);
    app.get('/skillInfo/',isLoggedIn,function(req,res){
        Skill.getFullSkillInfo(req,res);
    })
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}