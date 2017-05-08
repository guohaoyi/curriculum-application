process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var db = require('./config/db');
var express = require('./config/express'),
    passport = require('./config/passport');

var app = express();

var port = 3333;

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

module.exports = app;
