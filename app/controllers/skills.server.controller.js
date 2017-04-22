var Skill = require('../models/skills');
exports.getSkillList = function(req,res){
    Skill.getSkillList(function(err,rows){
        res.send(rows);
    })
};
exports.getFullSkillInfo = function(req,res){
    var id = req.user.id;
    console.log(id);
    Skill.getSkillForProfile(id,function(err,rows){
        res.send(rows);
    })
};