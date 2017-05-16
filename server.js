process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.UseDatabase = process.env.UseDatabase||"datavizProduction"  
process.env.PORT= process.env.PORT|| 3333
var db = require('./config/db');
var express = require('./config/express'),
    passport = require('./config/passport');

var app = express();

//var port = 3333;

db.connect(db.MODE_TEST, function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {

    app.listen(process.env.PORT, function() {
      console.log('Listening on port '+process.env.PORT+'...')

    

    })
  }
})

module.exports = app;
