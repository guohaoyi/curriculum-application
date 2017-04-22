//Polyfill for Array.prototype.filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

//Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

//Script for Radar Chart
var skills = null,course_skills = null;

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
        url: '/skillInfo',
        type: 'GET',
	async: false,
        success: function(result){
            course_skills = result;
        }
    });
}

getAllSkills();
getCourseSkills();
var aggregate = [];

for(var i=0;i<skills.length;i++)
{
    aggregate[skills[i].skill]=0;
}
//console.log(aggregate);
var semesters = [];
for(var i=0;i<course_skills.length;i++)
{

    if(!semesters.includes(course_skills[i].season + " " + course_skills[i].year))
       {
	   semesters.push(course_skills[i].season + " " + course_skills[i].year);
       }
}

var learned_skills = [];

for(var i=0;i<semesters.length;i++)
{
    var temp = [];
    learned_skills.push(temp);
    for(var j=0;j<course_skills.length;j++)
	{
	    if(semesters[i]==course_skills[j].season + " " + course_skills[j].year)
	    {
		var containsSkill = learned_skills[i].filter(function(course) { return course.axis == course_skills[j].skill; })
		if(containsSkill.length>0)
		    {
			containsSkill[0].value = course_skills[j].score + containsSkill[0].value;
			aggregate[course_skills[j].skill] +=course_skills[j].score;
		    }
		else
		    {
			var json = JSON.parse('{"axis":"' + course_skills[j].skill + '","value":' + course_skills[j].score + '}');
			learned_skills[i].push(json);
			aggregate[course_skills[j].skill] +=course_skills[j].score;
		    }
	    }
	}
}
//adds 0's?
for(var i=0;i<skills.length;i++)
{
    for(var j=0;j<semesters.length;j++)
	{
	    var containsSkill = learned_skills[j].filter(function(course) { return course.axis == skills[i].skill; })
	    if(containsSkill.length==0)
		{
		    var json = JSON.parse('{"axis":"' + skills[i].skill + '","value":0}');
                    learned_skills[j].push(json);
		}
	}


}

var total =[];
for(var i=0;i<skills.length;i++)
{
    var skill  = skills[i].skill;
    var val = aggregate[skill];

    var obj = {skill:skill,value:val};
    total.push(obj);
}

//console.log(semesters,learned_skills,skills);
//console.log(learned_skills,[total]);


//RadarScript(semesters,learned_skills,skills);
RadarScript(["total"],[total],skills);

/*semesters.unshift("total");
learned_skills.unshift(total);
RadarScript(semesters,learned_skills,skills);
*/

