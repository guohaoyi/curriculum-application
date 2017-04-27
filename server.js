process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var db = require('./config/db');
var express = require('./config/express'),
    passport = require('./config/passport');

var app = express();

var port = 59999;
var port = 3000;
//var port = 52235;



db.connect(db.MODE_TEST, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {

    app.listen(port, function() {
      console.log('Listening on port '+port+'...')

    

    })
  }
})

//app.listen(51234);
module.exports = app;

//console.log("server running at port 51234...");
