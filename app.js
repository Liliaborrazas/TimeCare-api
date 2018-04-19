const express = require('express');
const path = require('path');
const logger = require('morgan');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const corsConfig = require('./configs/cors.config');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
 

require('./configs/db.config');
require('./configs/passport.config').setup(passport);



const usersRoutes = require('./routes/users.routes');
const sessionRoutes = require('./routes/session.routes');
const eventRoutes = require('./routes/event.routes');
const valorationRoutes = require('./routes/valoration.routes');

const app = express();
app.use(cors(corsConfig))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 2419200000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.session = req.user || {};
  next();
});


app.use('/users', usersRoutes);
app.use('/session', sessionRoutes);
app.use('/event', eventRoutes);
app.use('/valoration', valorationRoutes);


app.post('/users', upload.array(), function (req, res, next) {
  // req.body contains the text fields 
})
app.post('/event', upload.array(), function (req, res, next) {
  // req.body contains the text fields 
})

// catch 404 and forward to error handler
app.use((req, res, next)  => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message || '' });
});


module.exports = app;
