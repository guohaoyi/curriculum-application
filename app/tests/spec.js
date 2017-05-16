//process.env.NODE_ENV = "testing"
process.env.PORT = 8081;

/*var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require("chai-http");
chai.use(chaiHttp);
*/
var app = require('../../server'),
 request = require('supertest'),
 should = require('should');
var testing_User = function() {
    return [
	{id:"2",
	  email:"test@test.test",
	  time_created:"2016-11-01 19:47:51 ",
	 password:"yo"
	 },
	 {id:"5",                                                                          
          email:"test@centre.test",                                                        
          time_created:"2016-10-01 19:47:51 ",                                           
         password:"SavIsCool"                                                                   
         },      
	 
	
    ];
    };



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
    request(app).get('/courseList').expect('200', done)}),                                                  */   
describe ('I can add a user with /signup', function()
{
    var addUser=function(email)
    {
    it ('I can add a user', function(done)
    {
	request(app).post("/signup")
	    .send(email).end(function(err,res)
		{
		   // expect(res).to.have.status(200);
		    done();
		 });
	});
    }
    
testing_User().forEach(addUser);
});

describe('testing backend  on /login', function () {      
    var getUser=function(user)
     {
	 it('should get: successful', function(done)
	    {

		request(app).get('/login').end(function(err,res)
		{
		    console.log("Result: ",res);
		    console.log("Error:  ",err);
		    //expect(res).to.have.status(200);
		    //var obj= json.parse(res.text);
		    
		    //expectToMatchFields(obj,user, ["id","email","time_created","password"]);
		    done()
		    });
		});
     }

     testing_User().forEach(getUser);

});
