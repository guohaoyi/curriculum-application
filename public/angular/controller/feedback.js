var app = angular.module("curriculum", []);

app.directive('myHeader', function()
	      {
		  console.log("here")
		  return {
		      template: "../app/views/partials/header.ejs"
		  }
	      })
