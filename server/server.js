const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth } = require('express-openid-connect');

dotenv.load();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use((req, res, next) => {
    // This makes all query params available as 'query' in every EJS file
    res.locals.query = req.query.state; 
    next();
});

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL:
    process.env.BASE_URL ||
    (process.env.NODE_ENV !== 'production' && process.env.PORT
      ? `http://localhost:${process.env.PORT}`
      : undefined),
  // session: {
  //   rolling: false,
  //   absoluteDuration: 60 * 1000,
  //   cookie: {
  //     transient: process.env.AUTH0_COOKIE_TRANSIENT === 'true'
  //   }
  // }
  clientID: process.env.CLIENT_ID,
   clientSecret: process.env.SECRET,
   authorizationParams: {
 response_type: 'code',
   
    scope: 'openid profile email offline_access'
  //  max_age: 60 // force reauthentication if last login > 60 seconds ago
   }
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
   
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

http.createServer(app)
  .listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
  });


  