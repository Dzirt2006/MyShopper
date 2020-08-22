const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const compression = require('compression')
const session = require('express-session')
const passport = require('passport')
const db = require('./db');
const { User} = require('./db/models')

const PORT = process.env.PORT || 8000;
const socket = require('socket.io')

const http = require('http');
const server = http.createServer(app);

const io=socket(server);
require('./socket')(io);


// if (process.env.NODE_ENV !== 'production') require('./auth/secret')
require('./auth/secret')




//------------------------------------------pasport------------------------------------

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'shhh it is secret',
    resave: false,
    saveUninitialized: false
  })
)

// consumes 'req.session' so that passport can know what's on the session
app.use(passport.initialize())
// this will invoke our registered 'deserializeUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session())


// passport registration
passport.serializeUser((user, done) => {done(null, user.id)})

// If we've serialized the user on our session with an id, we look it up here
// and attach it as 'req.user'.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

  // auth and api routes
  app.use('/auth', require('./auth/google'))

//--------------------------------------------------------------------------------


//signed cookie
app.use(cookieParser(`${process.env.COOKIE_SECRET}`));

//use compression middleware for increasing perfomance
app.use(compression());

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// api routes
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "../src")));

// Send index.html for any other requests
app.get("*", async (req, res, next) => {
  // console.log(req.session)
  if (!req.signedCookies.id) { //create id for new user and save it in cookie
    const cookie = crypto.randomBytes(8).toString('hex');

    res.cookie('id', cookie, cookieConfig)
  }
  // res.clearCookie('id');
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

const cookieConfig = {
  httpOnly: false, // to disable accessing cookie via client side js
  maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
  signed: true //  use  with the cookieParser secret
};

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});



db.sync().then(() => {
  console.log('db synced');
  server.listen(PORT, () =>
    console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
  );
})




module.exports = app;
