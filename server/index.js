const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const axios = require('axios');
const compression = require('compression')
const { green, red } = require('chalk');

const db = require('./db');

// const PORT = process.env.PORT || 8000;
// const http = require('http');
// const WebSocket = require('ws');
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server })

// const users = [];

// wss.on('connection', function connection(ws,req) {
//   console.log(req.headers.cookie)
//   wss.clients.forEach(function each(client) {
//     if (client !== ws && client.readyState === WebSocket.OPEN) {
//       client.send("room: User " + req.headers.origin + " joined!");
//     }
//   })
//   ws.on('message', function incoming(data) {
//     console.log('conected', data)
//     // ws.send('Hey HO!')
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     })
//   })
// })


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
  if (!req.headers.cookie) { //create id for new user and save it in cookie
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




// db.sync().then(() => {
//   console.log('db synced');
//   server.listen(PORT, () =>
//     console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
//   );
// })


module.exports = app;
