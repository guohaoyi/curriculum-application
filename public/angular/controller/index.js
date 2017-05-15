(function()
{
    console.log("I am here. I am executing");
    angular.module("dataviz", ["ngRoute"]);
	   var routingConfig = function($routeProvider)
    {

	$routeProvider
	    .when("/",
	      {
			templateUrl:"index.ejs",
			controller:"homeController"
		    })
	    .when("/login",
		  {
		      templateUrl:"login.ejs",
		      controller:"loginController"
		    })
	    .when("/profile",
		  {
		      templateUrl:"profile.ejs",
		      controller:"profileController"
		  })
	    .when("/signup",
		  {
                      templateUrl:"signup.ejs",
                      controller:"signupController"
                  })
	    .when("/courseSearch",
                  {
                      templateUrl:"course_browser.ejs",
                      controller:"courseSearchController"
                  })
	    .when("/course_feedback/:course",
                  {
                      templateUrl:"course_feedback.ejs",
                      controller:"evaluationController"
                  })
	    .when("/courses/:course",
               {
                      templateUrl:"course.ejs",
                      controller:"coursesController"
                  })

	


	
	
	    .otherwise({redirectTo:"/badlink"});
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
	var login = function(user, password)
	{

	   
	    return $http.post('/login', {email: user, password: password});
	}
	var signup = function(user, password)
	{
	    return $http.post('/signup', {email: user, password: password});
	}
	var profilePage = function()
	{
	    
	    return $http.get('/profile');
	}
	var studentCourseList = function()
	{
	    return $http.get('/studentCourseList');
	}
	var course  = function(name)
	{
	    
	    return $http.get('courses/'+name);
	}
	var courseInfo = function(name)
	{
	    return $http.get('courses/'+name+'/info');
	}
	return {
	        getUserInfo:user,
	        
	    getCourses:course,
	    login: login,
	    signup: signup,
	    profilePage: profilePage,
	    studentCourseList: studentCourseList,
	    course: course,
	    courseInfo: courseInfo
	}
	
}
    
    var myHeader = function()
    {
	return {
	        templateUrl:"header.ejs"
	        };
    }
   var myFooter = function()
    {
        return {
                templateUrl:"footer.ejs"
                };
    }
//controllers
    var homeController = function($scope, $location)
    {
	console.log("here");
	$scope.goLogin = function()
	{
	    $location.path("/login");
	}
	$scope.goSignup = function()
	{
	    $location.path("/signup");
	}
    }
    var loginController = function($scope, courseServices, $location)
    {
	console.log(courseServices);
	$scope.goSignup = function()
	{
	    $location.path("/signup");
	}
	$scope.goHome = function()
	{
	    
	    $location.path("/");
	}
	$scope.loginButton = function()
	{
	   
	    courseServices.login($scope.login.email,$scope.login.password)
		.then(
		    function(message)
		      {
			  console.log("I am actually getting here");
			  if (message.data.message == "successful")
			      {
				  $location.path("/profile");
			      }
			  else
			      {
				  
				  $location.path("/login");
			      }
		      });
	}
    }
    var signupController = function($scope,courseServices, $location)
    {
	$scope.goHome = function()
	{
	    $location.path("/");
	}
	$scope.goLogin = function()
	{
	    $location.path("/login");
	}
	$scope.signupButton = function()
	{
	    console.log($scope.signup.email);
	    console.log($scope.signup.password);
	    courseServices.signup($scope.signup.email, $scope.signup.password)
		.then(function(message)
		      {
			  if(message.data.message = "successful")
			  {
			      $location.path("/profile");
			  }
			  else
			  {
			      $location.path("/signup");
			  }
		      })
	}
    }
    
    var profileController = function($scope, courseServices, $http, $location) {
	console.log("At the profile page");
	courseServices.profilePage();
	$scope.name = "Your Profile"
	console.log($location.url());
	$scope.goSearch = function()
	{
	    $location.path("/courseSearch");
	}
	$scope.goProfile = function()
	{
	    $location.path("/profile");
	}
	$scope.goHome = function()
	{
	    $location.path("/");
	}
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
					  generateGraph(semesters);
				   })
    
    courseServices.getCourses().then(function(message)
				     {
					 for (var i = 0; i < message.data.length; i++)
					     {
						 message.data[i].id = i;
					     }
					 $scope.courseList = message.data;
				     });
	
	
	
	$scope.filter = function()
	{
	    var divs= $('.checks');
	    console.log($scope.selected);
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
	console.log("here are the skills");
	console.log(skills);
	console.log(course_skills);
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
//	uncheckAll();
	$scope.goCourse = function(name)
	{
	    
	    $location.path("/course_feedback/"+name.course);
	}
	$scope.gotoCourse = function(name)
	{
	    $location.path("/courses/"+name.course);
	}
};
	var courseSearchController = function($scope, courseServices, $http, $location)
	{
	    $scope.name = "Course Browser";
	    console.log(courseServices.studentCourseList());
	    $scope.goSearch = function()
            {
            $location.path("/courseSearch");
        }
            $scope.goProfile = function()
            {
            $location.path("/profile");
        }
            $scope.goHome = function()
            {
            $location.path("/");
        }
	    
	}
    var evaluationController = function($scope, courseServices, $http, $location)
    {
	var URL = $location.url().split("%20");
	
	$scope.name = URL[0].split("/")[2] + " " + URL[1];
	$scope.registerData = function()
	{
	      function isAnyBlank()
      {
      return (($('#skill0').val() == "none") || ($('#skill1').val() == "none") || ($('#skill2').val() == "none") || ($('#skill0').val() == null) || ($('#skill1').val() == null) || ($('#ski\
ll2').val() == null));
      }
      function isAnyDuplicates()
      {
      return (($('#skill0').val() == $('#skill1').val()) || ($('#skill0').val() == $('#skill2').val()) || ($('#skill1').val() == $('#skill2').val()))
      }

	      if (isAnyBlank() || isAnyDuplicates())
   {
   alert("There is a duplicate or an empty skill. Please adjust before submitting");
   console.log("blank");
   }
   else
   {
   var allArray =[];

          var i;
          for(i=0;i<feedbackSkills;i++)
          {
              allArray.push( [ $("#skill"+i).val() || "",
                               $("#score"+i).val()]);
          }
          console.log(allArray);

          $.post("/addFeedBack",{data:allArray,course: $scope.name});
          //window.location.href = "/courses/<%= course %>";
                      window.history.back();
                      
   }
	}
    }
    var coursesController = function($scope, courseServices, $http, $location)
    {
	$scope.goSearch = function()
	{
	        $location.path("/courseSearch");
	    }
	$scope.goProfile = function()
	{
	        $location.path("/profile");
	    }
	$scope.goHome = function()
	{
	        $location.path("/");
	    }
       var URL = $location.url().split("%20");

        $scope.name = URL[0].split("/")[2] + " " + URL[1];
	courseServices.course($scope.name)
	    .then(function(message)
		  {
		      
		      $scope.title = message.data[0].course_title;
		      $scope.description = message.data[0].description;
		  });
	courseServices.courseInfo($scope.name)
	    .then(function(message)
		  {
		      console.log(message);
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
			      url: '/courses/'+$scope.name+'/info',
			      type: 'GET',
			      async: false,
			      success: function(result){
				  console.log(result);
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
		      console.log(skills);
		      console.log(course_skills);
		      console.log(votes);
		      if(skills.length>0)
		      {
			  RadarScript(["Evaluated Skills"],[course_skills],skills);
			  //    var votes = course_skills[0].votes;
			  var s = $('<span class="notice">This graph is the average of '+votes+' evaluation(s) </span>');
			  s.appendTo("#skill_legend");
		      }
		      
		      
		  });
    }
	
    angular.module("dataviz")
	.controller("profileController", profileController)
	.controller("loginController", loginController)
	.controller("signupController", signupController)
        .controller("homeController", homeController)
	.controller("evaluationController", evaluationController)
	.controller("courseSearchController", courseSearchController)
	.controller("coursesController", coursesController)
	.directive("myFooter", myFooter)
        .directive("myHeader", myHeader)
	.config(['$routeProvider',routingConfig])
    
	.service("courseServices", courseServices);
})();

