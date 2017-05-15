var testing_pokedex = function() {
    return [
	{name:"Abbra",
	  img:"http://web.centre.edu/michael.bradshaw/catchem/abra.png",
	  description:"Magic Cat?",
	 cool:true 
	 },
	{name:"Bee Drill",
	  img:"http://web.centre.edu/michael.bradshaw/catchem/beedrill.png",
	  description:"Ackward Bee",
	 cool:true
	 },
	{name:"Rattata",
	  img:"http://web.centre.edu/michael.bradshaw/catchem/rattata.png",
	  description:"Only thing I ever get in pokemon.",
	 cool:false 
	 }
    ];
    };


describe("Testing pokedex loaded",function()
{
    var pokedex;

beforeEach(function()
{
    pokedex = angular.module("pokedex");

    
    jasmine.addMatchers(
	{
	        toEqualData: function(util,customeEqualityTesters)
	    {
		    return{
			compare:function(actual,expected)
			{
			        return { pass:angular.equals(actual,expected) };
			    }
			    };
		}
	    });
});


it("should exist",function()
{
 
    expect(pokedex).toBeDefined();
});

describe("pokedexService Model",function()
{
    var model;

    beforeEach(function(){
	
	module("pokedex");

	
	inject(function(_pokedexModel_)
	             {
			 model =_pokedexModel_;  
			       }
	            );
}); 
           
    it("should exist",function()
{

    expect(model).toBeDefined();

});


    it("will return the pokedex",
       inject(function($httpBackend)
	            {
			  $httpBackend.expectGET("pokedex.json")
			  .respond(testing_pokedex());

			  var promise = model.getPokedex();


			  promise.then(function(message)
				              {
						     expect(message.data).toEqualData(testing_pokedex());
						         });

			  $httpBackend.flush();
			      }));



          });




describe("pokedexController",function()
{
    var model;

    beforeEach(function(){
	
	module("pokedex");

    });


    it(" should have the pokedex",function()
       {

	      inject(function($rootScope,$controller,$httpBackend)
		       {
			     $httpBackend.expectGET("pokedex.json")
			     .respond(testing_pokedex());
			         
			         _scope = $rootScope.$new();

			         var pc = $controller("pokedexController",
						         {$scope:_scope });

			         $httpBackend.flush();

			         expect(_scope.pokedex).toEqualData(testing_pokedex());
			     })



       });
 



});



});
