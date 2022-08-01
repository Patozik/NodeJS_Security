const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');
const helmet = require('helmet');
const rateLimiterMiddleware = require('./middleware/rate-limiter-middleware');

//init database
require('./db/mongoose');

//security helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: ["'self'","cdn.jsdelivr.net"],
            styleSrc: ["'self'","cdn.jsdelivr.net"]
        }
    }
}));

//security rate-limiter
app.use(rateLimiterMiddleware);

//session
app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    resave: true
}));

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));

// set layout
app.use(ejsLayouts);
app.set('layout', 'layouts/main.ejs');

//public folder
app.use(express.static('public'));

//body parser  //application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());

//json parser
app.use(express.json());

//middleware
app.use('/', require('./middleware/view-variables-middleware'));
app.use('/', require('./middleware/auth-middleware'));
app.use('/admin', require('./middleware/is-auth-middleware'));

//mount routes
app.use('/api',require('./routes/api'));
app.use(require('./routes/web'));


module.exports = app;