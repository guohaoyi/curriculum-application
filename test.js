var user_info = function() {
    return [[{"student_id":3,"course":"AAS 210     ","year":2015,"season":"                            Spring                        "}], [{"skill":"Communication","score":21.1317},{"skill":"Creativity","score":33.7221},{"skill":"Critical Thinking","score":30.631},{"skill":"Intellectual  Openness","score":26.4134},{"skill":"Perspective Taking","score":22.7222},{"skill":"Problem Solving","score":35.4409},{"skill":"Social Awareness and Empathy","score":20.4444},{"skill":"Teamwork","score":18.3825}]];
    
};
console.log(user_info());
var course_list = function()
{
    return 	[{"course_name":"AAS 210     ","course_title":"Music & Culture/African Diaspora  ","department":"AAS ","description":"This course is an introductory survey course which employs music as a lens to explore the history and culture of Africa and African America. Students learn about African musical genres on the continent and in the New World as well as the political, cultural, racial, class, and gender dynamics that shape and are shaped by them. More specifically, this course focuses of West Africa and the United States and provides students an introduction to (a) the political and social histories of both areas, (b) the musical characteristics of varied genres, (c) the social and political forces which shaped the evolution of the more significant musical genres, (d) the contemporary cultural and identity politics influencing and influenced by the music and (e) the connections between West African and African American music. (This course is intended to serve as the introductory course of the African and African American studies minor currently underdevelopment.)"}]
    
}


//testing routes
describe("Testing dataviz routing", function()
{
    beforeEach(module('dataviz'));
    it('should have an index route', function()
       {
	   inject(function($route)
		  {
		     console.log($route.routes["/"].templateUrl);
		      expect($route.routes["/"].templateUrl).toEqual('index.ejs');
		  })
       })
    it('should have a login route', function()
       {
	   inject(function($route)
		  {
		      expect($route.routes["/login"].templateUrl).toEqual('login.ejs');
		  })
       })
    it('should have a profile route', function()
       {
	   inject(function($route)
		  {
		      expect($route.routes["/profile"].templateUrl)
			  .toEqual('profile.ejs');
		  })
       })
    it('should have a signup route', function()
       {
           inject(function($route)
                  {
                      expect($route.routes["/signup"].templateUrl).toEqual('signup.ejs');
                  })
       })
    it('should have a course search route', function()
       {
           inject(function($route)
                  {
                      expect($route.routes["/courseSearch"].templateUrl)
			  .toEqual('course_browser.html');
                  })
       })
    it('should have a course feedback route', function()
       {
           inject(function($route)
                  {
                      expect($route.routes["/course_feedback/:course"].templateUrl)
			  .toEqual('course_feedback.ejs');
                  })
       })
    it('should have a course page route', function()
       {
           inject(function($route)
                  {
                      expect($route.routes["/courses/:course"].templateUrl)
			  .toEqual('course.ejs');
                  })
       })
})
//testing services
describe("Course Service",function()
    {
	var courseModel;       
	beforeEach(function()
		   {  
		       module("dataviz");
		       inject(function(courseServices)
			      {
				  courseModel= courseServices;
			      })
		   })    
	it("should exist",function()
	      {
		  expect(courseModel).toBeDefined();
	      });
	it("should have a get user info method",function()
	      {
		  expect(courseModel.getUserInfo).toBeDefined();
	      });   
	it("should have a getCourses method", function()
	   {
	       expect(courseModel.getCourses).toBeDefined();
	   })
	it("should have a login method", function()
	   {
	       expect(courseModel.login).toBeDefined();
	   })
	it("should have a signup method", function()
	   {
	       expect(courseModel.signup).toBeDefined();
	   })
	it("should have a profilePage method", function()
	   {
	       expect(courseModel.profilePage).toBeDefined();
	   })
	it("should have a studentCourseList method", function()
           {
               expect(courseModel.studentCourseList).toBeDefined();
           })
	it("should have a course method", function()
           {
               expect(courseModel.course).toBeDefined();
           })
	it("should have a courseInfo method", function()
           {
               expect(courseModel.courseInfo).toBeDefined();
           })
    });
//login controller
describe('Testing Login  Controller', function() {
    var _scope, loginController;
    beforeEach(function() {
	module('dataviz');
	jasmine.addMatchers({
	        toEqualData: function(util, customEqualityTesters) {
		    return {
			    compare: function(actual, expected) {
				return {
				        pass: angular.equals(actual, expected)
				    };
				    }
			};
		        }
	    });
	inject(function($rootScope, $controller) {
	        _scope = $rootScope.$new();
	        loginController = $controller('loginController', {
		    $scope: _scope
		        });
	    });
    });
    it("should be defined", function()
       {
	   expect(loginController).toBeDefined();
       })
    
    it("should change locations properly for the goHome",
          inject(function($controller,$location)
		 {
		     var loginController = $controller("loginController",
						       {$scope:_scope,
							$location:$location});
		     
		     spyOn($location,"path");
		     _scope.goHome();
		     
		     expect($location.path)
			 .toHaveBeenCalledWith("/");
		 }));
    it("should change locations properly for the goSignup",
       inject(function($controller,$location)
              {
                  var loginController = $controller("loginController",
                                                    {$scope:_scope,
                                                     $location:  $location});
                  spyOn($location,"path");
                  _scope.goSignup();
                  expect($location.path)
                      .toHaveBeenCalledWith("/signup");
              }));
     
});
//signup controller
describe('Testing Signup Controller', function() {
    var _scope, signupController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                signupController = $controller('signupController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
	   expect(signupController).toBeDefined();
       })
    it("should change locations properly for the goHome",
          inject(function($controller,$location)
                 {
                     var signupController = $controller("signupController",
                                                       {$scope:_scope,
                                                        $location:$location});

                     spyOn($location,"path");
                     _scope.goHome();
                     expect($location.path)
                         .toHaveBeenCalledWith("/");
                 }));
    it("should change locations properly for the goLogin",
       inject(function($controller,$location)
              {
                  var signupController = $controller("signupController",
                                                    {$scope:_scope,
                                                     $location:  $location});
                  spyOn($location,"path");
                  _scope.goLogin();
                  expect($location.path)
                      .toHaveBeenCalledWith("/login");
              }));
});
//home page controller
describe('Testing Home Controller', function() {
    var _scope, homeController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                homeController = $controller('homeController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
           expect(homeController).toBeDefined();
       })
    it("should change locations properly for the goLogin",
          inject(function($controller,$location)
                 {
                     var homeController = $controller("homeController",
                                                       {$scope:_scope,
                                                        $location:$location});

                     spyOn($location,"path");
                     _scope.goLogin();
                     expect($location.path)
                         .toHaveBeenCalledWith("/login");
                 }));
    it("should change locations properly for the goSignup",
       inject(function($controller,$location)
	      
              {
                  var homeController = $controller("homeController",
                                                     {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goSignup();
                  expect($location.path)
                      .toHaveBeenCalledWith("/signup");
              }));
      });

//profile controller
describe('Testing Profile Controller', function() {
    var _scope, profileController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                profileController = $controller('profileController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
           expect(profileController).toBeDefined();
       })
    it("should change locations properly for the goSearch",
          inject(function($controller,$location)
                 {
                     var profileController = $controller("profileController",
                                                       {$scope:_scope,
                                                        $location:$location});
		     spyOn($location,"path");
                     _scope.goSearch();
                     expect($location.path)
                         .toHaveBeenCalledWith("/courseSearch");
                 }));
    it("should change locations properly for the goProfile",
       inject(function($controller,$location)

              {
                  var profileController = $controller("profileController",
                                                     {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goProfile();
                  expect($location.path)
                      .toHaveBeenCalledWith("/profile");
              }));
     it("should change locations properly for the goHome",
       inject(function($controller,$location)

              {
                  var profileController = $controller("profileController",
                                                      {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goHome();
                  expect($location.path)
                      .toHaveBeenCalledWith("/");
              }));
    
})
//evaluation controller
describe('Testing Evaluation Controller', function() {
    var _scope, evaluationController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                evaluationController = $controller('evaluationController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
           expect(evaluationController).toBeDefined();
       })
    it("should change locations properly for the goSearch",
          inject(function($controller,$location)
                 {
                     var evaluationController = $controller("evaluationController",
                                                       {$scope:_scope,
                                                        $location:$location});
                     spyOn($location,"path");
                     _scope.goSearch();
                     expect($location.path)
                         .toHaveBeenCalledWith("/courseSearch");
                 }));
  it("should change locations properly for the goProfile",
       inject(function($controller,$location)

              {
                  var evaluationController = $controller("evaluationController",
                                                     {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goProfile();
                  expect($location.path)
                      .toHaveBeenCalledWith("/profile");
              }));
     it("should change locations properly for the goHome",
       inject(function($controller,$location)

              {
                  var evaluationController = $controller("evaluationController",
                                                      {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goHome();
                  expect($location.path)
                      .toHaveBeenCalledWith("/");
              }));

})

//course browser controller
describe('Testing Course Browser Controller', function() {
    var _scope, courseSearchController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                courseSearchController = $controller('courseSearchController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
           expect(courseSearchController).toBeDefined();
       })
    it("should change locations properly for the goSearch",
          inject(function($controller,$location)
                 {
                     var courseSearchController = $controller("courseSearchController",
                                                       {$scope:_scope,
                                                        $location:$location});
                     spyOn($location,"path");
                     _scope.goSearch();
                     expect($location.path)
                         .toHaveBeenCalledWith("/courseSearch");
                 }));
  it("should change locations properly for the goProfile",
       inject(function($controller,$location)

              {
                  var courseSearchController = $controller("courseSearchController",
                                                     {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goProfile();
                  expect($location.path)
                      .toHaveBeenCalledWith("/profile");
              }));
     it("should change locations properly for the goHome",
       inject(function($controller,$location)

              {
                  var courseSearchController = $controller("courseSearchController",
                                                      {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goHome();
                  expect($location.path)
                      .toHaveBeenCalledWith("/");
              }));

})

//course page controller
describe('Testing Course  Controller', function() {
    var _scope, courseController;
    beforeEach(function() {
        module('dataviz');
        jasmine.addMatchers({
                toEqualData: function(util, customEqualityTesters) {
                    return {
                            compare: function(actual, expected) {
                                return {
                                        pass: angular.equals(actual, expected)
                                    };
                                    }
                        };
                        }
            });
        inject(function($rootScope, $controller) {
                _scope = $rootScope.$new();
                courseController = $controller('coursesController', {
                    $scope: _scope
                        });
            });
    });
    it("should be defined", function()
       {
           expect(courseController).toBeDefined();
       })
    it("should change locations properly for the goSearch",
          inject(function($controller,$location)
                 {
                     var courseController = $controller("coursesController",
                                                       {$scope:_scope,
                                                        $location:$location});
                     spyOn($location,"path");
                     _scope.goSearch();
                     expect($location.path)
                         .toHaveBeenCalledWith("/courseSearch");
                 }));
 it("should change locations properly for the goProfile",
       inject(function($controller,$location)

              {
                  var courseController = $controller("coursesController",
                                                     {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goProfile();
                  expect($location.path)
                      .toHaveBeenCalledWith("/profile");
              }));
     it("should change locations properly for the goHome",
       inject(function($controller,$location)

              {
                  var courseController = $controller("coursesController",
                                                      {$scope:_scope,
                                                      $location:  $location});
                  spyOn($location,"path");
                  _scope.goHome();
                  expect($location.path)
                      .toHaveBeenCalledWith("/");
              }));
})
