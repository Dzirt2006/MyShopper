const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const crypto = require('crypto');



const session = require('express-session');
// app.use(
//   session({
//     UUID: crypto.randomBytes(64).toString('hex'),
//     secret: process.env.SESSION_SECRET || 'Shh, its a secret!',
//     resave: false,
//     saveUninitialized: false
//   })
// )

app.use(cookieParser(`${process.env.COOKIE_SECRET}`));

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
app.get("*", (req, res) => {
  //create id for new user and save it in cookie
  if (!req.headers.cookie) {
    res.cookie('id', `${crypto.randomBytes(8).toString('hex')}`, cookieConfig)
  }
  // res.clearCookie('id');
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
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



module.exports = app;
