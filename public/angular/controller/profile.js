var app = angular.module("userInfo", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "profilePageCourseHad.html"
    }).when("/addCourse", {
        templateUrl: "addCourse.html"
    })
});
app.controller('profileCtrl', function ($scope, $http, $location) {

    $http.get('/profile/userInfo').then(function (res) {
        $scope.courses = res.data[0];
        $scope.skills = res.data[1];
	console.log($scope.skills);
	var semesters = [];
	for (var i = 0; i < res.data[0].length; i++) {
	    var term = res.data[0][i].season.replace(/\s/g,'') + " " + res.data[0][i].year;
	    if (semesters.indexOf(term) == -1) {
		semesters.push(term);
	    }
	}
	$scope.semesters = semesters;
	$scope.currentcourses = res.data[0];
	console.log($scope.currentcourses);
    });

    $http.get('/courseList').then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
            res.data[i].id = i
        }
        $scope.courseList = res.data;
    });
    
    
    $scope.filter = function()
    {
	var divs = $('.checks');
	var courses = [];
	
	for (var i = 0; i < divs.length; i ++)
	    {
		var divchildren = $(divs[i]).children();
		if (divchildren[0].checked)
		    {
			console.log(divchildren[1]);
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
	
    }
    
    $scope.restore = function()
    {
	$scope.currentcourses = $scope.courses;
	uncheckAll();
    }
    function uncheckAll()
    {
	var divs = $('.checks');
	for (var i = 0; i < divs.length; i++)
	    {
		var divchildren = $(divs[i]).children();
		divchildren[0].checked = false;
	    }
    }
});
