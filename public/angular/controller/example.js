(function()
{
    angular.module("userInfo", ["ngRoute"]);
var courseServices = function($http)
    {
	var getUserInfo = function()
	{
	    return $http.get('/profile/userInfo');
	}
	var getCourseList = function()
	{
	    return $http.get('/courseList');
	}
	return
	{
	    userInfo: getUserInfo
	    courseList: getCoureList
	}
    }
    
    console.log(courseServices);
    angular.module('userInfo')
    .service("courseServices", courseServices);
})();
