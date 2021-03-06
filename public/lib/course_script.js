//Script for Radar Chart                                                        
var skills = [],course_skills = [];
var votes=0;
function getAllSkills()
{
    return $.ajax({
        url: '/skillList',
        type: 'GET',
        async: false,
        success: function(result){   
		skills = result;
        }
    });
}

function getCourseSkills()
{
    return $.ajax({
        url: window.location + '/info',
        type: 'GET',
        async: false,
        success: function(result){
	    votes = result[0].votes;
            for(var i=0;i<result.length;i++)
            {
		course_skills.push({axis:result[i].skill ,value:result[i].score });
            }
        }
    });
}

getAllSkills();
getCourseSkills();

if(skills.length>0)
{
    RadarScript(["Evaluated Skills"],[course_skills],skills);
//    var votes = course_skills[0].votes;
    var s = $('<span class="notice">This graph is the average of '+votes+' evaluation(s) </span>');
    s.appendTo("#skill_legend");
}
