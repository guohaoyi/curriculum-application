process.env.UseDatabse = "dataVizTesting"                                                                                                      
process.env.PORT = 3696;                                                                                              var db = require('../config/db');                    
                                                                                                                                        
var chai = require('chai');                                                                                                           
var expect = chai.expect;                                                                                                               
var chaiHttp = require("chai-http");                                                                                                    
chai.use(chaiHttp);                                                                                                                     
                                                                                                                     // beforeEach(function () {
  //  server = require('../server', { bustCache: true });
 // });
  //afterEach(function (done) {
    //server.close(done);
  //});                 
var app = require('../server'),                                                                                                      
 request = require('supertest'),                                                                                                        
 should = require('should');                                                                                                            
var testing_User = function() {                                                                                                         
    return [                                                                                                                            
        {
          email:"SAVYO@test.test",                                                                                                       
          
         password:"hi"                                                                                                                  
         },                                                                                                                             
         {
          email:"yo@centre.test",                                                                                                     
          
         password:"Sup"                                                                                                           
         }                                                                                                                             
                                                                                                                                        
                                                                                                                                        
    ];                                                                                                                                  
    };                                                                                                               var clear = function() {
        db.get().query("TRUNCATE TABLE user");
}
                                                                                                                                        

                                                                                                                                        
/*describe('Testing GET', function () {                                                                                                 
    /*var server;                                                                                                                       
    beforeEach(function () {                                                                                                            
        server = require('../../server.js', { bustCache: true });                                                                       
  });                                                                                                                                   
    });                                                                                                                                 
    afterEach(function (done) {                                                                                                         
        server.close(done);                                                                                                             
    });*//*                                                                                                                             
 it('responds to /course_feedback', function isLoggedIn(done) {                                                                         
    request(app).get('/course_feedback/:course').expect('Found. Redirecting to /', done);                                               
  });                                                                                                                                   
 it('responds to /courseList', function isLoggedIn(done) {                                                                              
    request(app).get('/courseList').expect('200', done)}),  */     





describe('testing backend for signup', function() {
    

it('responds to /signup', function isLoggedIn(done) {                                                                                         
    request(app).get('/signup').end(function(err,res)                                                                                         
             {                                                                                                                                
                 //console.log("PROFILE:"+ res)                                                                                                
                 expect(res).to.have.status(200);                                                                                                              done()                                                                                                                                                                                                                                                                      
             });                                                                                                                 
                                                                                                                                              });
  var getUser=function(user)                                                                                                                 
    {                                                                                                                                          
         it('should get: successful', function(done)                                                                                           
            {                                                                                                                                  
               //console.log("here");                                                                                                         

                request(app).post('/signup').send(user).end(function(err,res)                                                                              
                {                                                                                                                                                 console.log("Result: ",res);                                                                                                              //  console.log("Error Message: ", err);                                                                                     
                    console.log("Message:",res.text);                                                                                          
                    //console.log("Error:  ",err);                                                                                             
                    expect(res).to.have.status(200);                                                                                           
                    //var obj= json.parse(res.text);                                                                                                               //expectToMatchFields(obj,user, ["id","email","time_created","password"]);                                                 
                    done()                                                                                                                     
                    });                                                                                                                        
                });                                                                                                                            
    }                                                                                                                                     
    testing_User().forEach(getUser); 
//    clear()
           });                                                                                                                              
                    

describe('testing backend on /profile', function() {                                                                                         
    it('gets Objects from  /profile and redirects ', function isLoggedIn(done) {                                                                        
            request(app).get('/profile').expect('Found. Redirecting to /', done);                                                        
    });                                                                                                                                    
		

																	     
it('responds to /profile', function isLoggedIn(done) {
    request(app).get('/profile').end(function(err,res)                                                                        
             {                                                                                                                                                 //console.log("PROFILE:"+ res)
		 expect(res).to.have.status(302);                                                                                              
                 done()                                                                                                                        
             });                                                                                                                                                                                                                                                                             
             });                                                                                                                                          });                                                                                                                                
                 
describe('testing backend on /courses/:course/info', function() {                                                                                           
    it('find course/info and redirect  ', function isLoggedIn(done) {                                                                          request(app).get('/courses/:course/info').expect('Found. Redirecting to /', done);                                                              
    });                                                                                                                                        it('responds to /courses/:course/info', function isLoggedIn(done) {                                                                                         
    request(app).get('/courses/:course/info').end(function(err,res)                                                                                         
             {                                                                                                                                
                 console.log("NEW TEST:"+ res)                                                                                                
                 expect(res).to.have.status(302);                                                                                                              done()                                                                                                                                                                                                                                                                      
             });                                                                                                                                           });                                                                                                                              
            });                                                                                                                               
                    

 
describe('testing backend on /profile/userInfo', function() {
    
    
	it('responds to /profile/userInfo', function isLoggedIn(done) {                           
	    request(app).get('/profile/userInfo').expect('Found. Redirecting to /', done); 
                                                                                           
	});   
     it('responds to /profile/userInfo', function isLoggedIn(done) {
             
            request(app).get('/profile/userInfo').end(function(err,res)
             {
		 expect(res).to.have.status(302);
		 done()
	     });
                                                                                                                                                
             });                                                                                                                                     
                  
	
	    });

	    
describe('testing backend  on /login', function () {                                                                                    
    var getUser=function(user)                                                                                                          
    {                                                                                                                                  
         it('should get: successful', function(done)                                                                                    
            {                                                                                                                           
               //console.log("here");                                                                                                                         
                request(app).post('/login').end(function(err,res)                                                                        
                {                                                                                                                       
                    //console.log("Result: ",res);                                                              
		  //  console.log("Error Message: ", err);
		    console.log("Message:",res.text);               
                    //console.log("Error:  ",err);                                                                                        
                    expect(res).to.have.status(200);                                                                                  
                    //var obj= json.parse(res.text);                                                                                    
                                                                                                                                        
                    //expectToMatchFields(obj,user, ["id","email","time_created","password"]);                                          
                    done()                                                                                                              
                    });                                                                                                                 
                });
        }

//});
     
testing_User().forEach(getUser);                                                                                                   
                                                                                                                                        
});      
describe('testing backend on /profile/addSelectedCourses', function() {                                                                                          it('responds to /profile/addSelectedCourses and Redirects', function isLoggedIn(done) {                                                                         
            request(app).post('/profile/addSelectedCourses').expect('Found. Redirecting to /', done);                                                      
                                                                                                                                                
        });                                                                                                                                     
     it('responds to /profile/addSelectedCourses', function isLoggedIn(done) {                                                      
                      
            request(app).post('/profile/addSelectedCourses').end(function(err,res)                                                                         
             {                                                                                                                                  
                 expect(res).to.have.status(302);                                                                                               
                 done()                                                                                                                         
             });                                                                                                                                
                                                                                                                                               
                                                                                                                                                
        });                                                                                                                                                });  

describe('testing backend on /addFeedBack', function() {                                                                            
              it('responds to /addFeedBack and Redirects', function isLoggedIn(done) {                                              
                                                                                                                                                    
            request(app).post('/addFeedBack').expect('Found. Redirecting to /', done);                                                                                                                                                                                                  
        });                                                                                                                                         
     it('responds to /addFeedBack', function isLoggedIn(done) {                                                                      
                                                                                                                                                    
            request(app).post('/addFeedBack').end(function(err,res)                                                                 
                                                                                                                                                    
            { 
                 //console.log(res.text);
                 expect(res).to.have.status(302);                                                                                                   
                 done()                                                                                                                             
             });                                                                                                                                    
        });                                                                                                                                        
        }); 

describe('testing backend on /courses/:course/info', function() {                                                                                            
              it('responds to /courses/:course/info and Redirects', function isLoggedIn(done) {                                                                         request(app).get('/courses/:course/info').expect('Found. Redirecting to /', done);                                                                     });                                                                                                                                        
                                                                                                                                                    
     it('responds to /addFeedBack', function isLoggedIn(done) {                                                                                                 request(app).get('/courses/:course/info').end(function(err,res)                                                                                            {                                                                                                                                     
                                                                                                                                                    
                 expect(res).to.have.status(302);                                                                                                                   done()                                                                                                                            
                 
             });                                                                                                                                   
                                                                                                                                                    
        });                                                                                                                                         
        });    



describe('testing backend on /skillInfo', function() {                                                                                                 it('responds to /skillInfo', function isLoggedIn(done) {                                                     
                    request(app).get('/skillInfo').expect('Found. Redirecting to /', done);                                              
                       });                                                                                                                                                                                                                                                                               
                                                                                                                                                     
     it('responds to /skillInfo', function isLoggedIn(done) {                                                                                     
            request(app).get('/skillinfo').end(function(err,res)                                                                         
                   {                                                                                                                                                 console.log(res.text);
		       expect(res).to.have.status(302);                                                                                                   
                done()                                                                                                                               
                                                                                                                                                     
             });                                                                                                                                             });                                                                                                                                          
             }); 
describe('testing /skillList', function(){
    it(' /skillList returns skill list in res', function (done) {                                                                                 
                                                                                                                                               
            request(app).get('/skillList').end(function(err,res)                                                                               
                   {                                                                                                                          
                       //console.log(res.text);                                                                                                                        
		       expect(res).to.have.status(200);                                                                                                       done()                                                                                                                                     });
});
                                                                                                                                               
        });          
describe('testing /course_feedback/:course', function(){                                                                                                    
     it('responds to /course_feedback/:course and Redirects', function isLoggedIn(done) {                                               
                          request(app).get('/course_feedback/:course').expect('Found. Redirecting to /', done);                                  
                                   });                                                                                                        
                                   

    it(' /course_feedback/:course redirects ', function (done) {                                                                             
        request(app).get('/course_feedback/:course').end(function(err,res)                                                                                                 {                                                                                                                           
                       //console.log(res.text);                                                                                               
                                                                                                                                               
                       expect(res).to.have.status(302);                                                                                       
                done()                                                                                                                        
             });                                                                                                                               
});                                                                                                                                                   });    


describe('testing /courseList', function(){                                                                                      
                                                           
it(' /courseList should show list of courses ', function (done) {                                                                               
        request(app).get('/courseList').end(function(err,res)                                                                    
                             {                                                                                                                                                                                                                                                               
                       //console.log(res.text);                                                                                                                        
				 expect(res).to.have.status(200);                                                                                        
				 done()                                                                                                                         
             });                                                                                                                              
                                                                                                                                               
	     });                                                                                                                                           
        });                                                                                                                                    
	describe('testing /studentCourseList', function(){                                                                                                    
                                                                                                                                               
it(' /studentCourseList should find list of courses for student and Redirect', function (done) {                                                                             
                                                                                                                                               
    request(app).get('/studentCourseList').end(function(err,res)                                                                                  
                             {                                                                                                                
                                                                                                                                               
                       //console.log(res.text);                                                                                                 
                       expect(res).to.have.status(302);                                                                                                                               
                                                                                                       
                done()                                                                                                                        
                                                                                                                                               
		});                                                                                                                               });                                                                                                                                            
        });                 
describe('testing /courseSearch', function(){

it(' /courseSearch should find courses and Redirect', function (done) {  
        request(app).get('/courseSearch').end(function(err,res)                                                                                                       {                                                                                                                 
                       //console.log(res.text);                                                                                                  
                       expect(res).to.have.status(302);                                                                                                                                                                                                                                      
                done()                                                                                                                                     });                                                                                                                              
 });
})                                                                                                                   

clear();


    
