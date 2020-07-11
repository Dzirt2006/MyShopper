const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;

const createApp = () => {
  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // api routes
  app.use("/api", require("./api"));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "../src")));

  // Send index.html for any other requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
  });

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
};

const portListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(
      `studiously serving silly sounds on port http://localhost:${PORT}`
    )
  );

  async function runApp(){
      await createApp();
      await portListening();
  }
console.log('auch!')
  runApp();

};



module.exports = app;
