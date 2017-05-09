(function()
{
    
    angular.module("dataviz", ["ngRoute"]);
    var routeParams = function ($routeProvider) {
	$routeProvider.when("/", {
            templateUrl: "home.html",
	    
	}).when("/login", {
	    templateURL: "home.html",
	})
	.when("/profile", {
	    templateURL: "profile.ejs"
	})
	.when("/courseSearch",{
	    templateURL: "course_browser.ejs",
	})
	.when("/signup", {
	    templateURL : "home.html",
	})
	    .when("/addCourse", {
            templateUrl: "addCourse.html"
	});
    };
    var courseServices = function($http)
    {
	var user = function()
	{
	        return $http.get("/profile/userInfo");
	    }

	var course = function()
	{
	       return $http.get('/courseList');
	    }

	return {
	        getUserInfo:user,
	        
	    getCourses:course    
	}

	
}
    var userInfo = function()
    {
	return{
	    templateURL: "profilePageCoursesHad.html"
	}
    }
var profileController = function($scope, courseServices, $http, $location) {
    console.log(courseServices);
    courseServices.getUserInfo().then(function(message)
				   {
				       var userData = message.data;
				       $scope.courses = userData[0];
				       $scope.skills = userData[0];
				       var semesters = [];
				       for (var i = 0; i < userData[0].length; i++) {
					   var term = userData[0][i].season.replace(/\s/g,'') + " " + userData[0][i].year;
					   if (semesters.indexOf(term) == -1) {
					       semesters.push(term);
					   }
				       }
				       $scope.semesters = semesters;
				       $scope.currentcourses = userData[0];
				       
				   })
    
    courseServices.getCourses().then(function(message)
				     {
					 for (var i = 0; i < message.data.length; i++)
					     {
						 message.data[i].id = i;
					     }
					 $scope.courseList = message.data;
				     })
   
    
    
    $scope.filter = function()
    {
	var divs = $('.checks');
	var courses = [];
	var semesters = [];
	
	for (var i = 0; i < divs.length; i ++)
	        {
		    
		    var divchildren = $(divs[i]).children();
		    if (divchildren[0].checked)
		    {
			
			semesters.push($(divchildren[1]).text());
			for (var j = 0; j < $scope.courses.length; j++)
			{
			    
			    var term = $scope.courses[j].season.replace(/\s/g,'') + " " + $scope.courses[j].year;
			    if ($(divchildren[1]).text()== term)
			    {
				courses.push($scope.courses[j]);
			    }
			}
		    }
		}
	
	$scope.currentcourses = [];
	$scope.currentcourses = courses;
	generateGraph(semesters);
    }
    
    $scope.restore = function()
    {
	$scope.currentcourses = $scope.courses;
	uncheckAll();
    }
    function uncheckAll()
    {
	var divs = $('.checks');
	var semestesr = [];
	for (var i = 0; i < divs.length; i++)
	        {
		    var divchildren = $(divs[i]).children();
		    divchildren[0].checked = false;
		    semesters.push($(divchildren[1]).text());
		        }
	generateGraph(semesters);
	
    }


    function generateGraph(semesters)
    {
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

	var skills = null;
	var course_skills = null;
	getAllSkills()
	getCourseSkills();
	var aggregate = [];
	
	for(var i=0;i<skills.length;i++)
	{
		aggregate[skills[i].skill]=0;
	    }
	
	
	
	var learned_skills = [];
	
	for(var i=0;i<semesters.length;i++)
	{
		var temp = [];
		learned_skills.push(temp);
		for(var j=0;j<course_skills.length;j++)
		{
				if(semesters[i]==course_skills[j].season.replace(/\s/g,'') + " " + course_skills[j].year)
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
	console.log($('#skill_legend span').text());
	$('#skill_legend span').text( "This graph is a summary of " + $scope.currentcourses.length + " course(s)");
	RadarScript(["total"],[total],skills);
    }

};
    angular.module("dataviz")
	.directive("userInfo", userInfo)
	.controller("profileController", profileController)
        .config(['$routeProvider',routeParams])
	.service("courseServices", courseServices);
})();

