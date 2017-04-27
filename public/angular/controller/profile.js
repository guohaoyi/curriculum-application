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
	var semesters = [];
	for (var i = 0; i < res.data[0].length; i++) {
	    var term = res.data[0][i].season.replace(/\s/g,'') + " " + res.data[0][i].year;
	    if (semesters.indexOf(term) == -1) {
		semesters.push(term);
	    }
	}
	$scope.semesters = semesters;
    });

    $http.get('/courseList').then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
            res.data[i].id = i
        }
        $scope.courseList = res.data;
    });
    $scope.selected = {};
    $scope.addCourses = function () {
        var d = {};
        for (var i in $scope.courseList) {
            if ($scope.selected[i]) {
                d[i] = $scope.courseList[i]
            }
        };
        console.log(d);
        $http({
            method: "POST",
            url: "/profile/addSelectedCourses",
            data: d
        }).then(function (res) {
            //TODO: change this to function call
            $http.get('/profile/userInfo').then(function (res) {
                $scope.courses = res.data[0];
                $scope.skills = res.data[1];
            });

            $location.path('/');

        });

    }
});
