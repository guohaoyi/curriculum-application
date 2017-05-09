var config = require('./config'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  passport = require('passport'),
  flash    = require('connect-flash');
require('./passport')(passport);

module.exports = function(){
    var app = express();
    
    if(process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if(process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './public');
    app.set('view engine','ejs');

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/skills.server.routes.js')(app);
    require('../app/routes/general.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app,passport);
    app.use(express.static('./public'));

    return app;
};
