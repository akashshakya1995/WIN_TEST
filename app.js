const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { basePath, baseRouter } = require("./helper/routeHandler");
cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-typeAccept, Authorization,token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/",function(req,res){
  return res.send("Hello project working fine!!")
})

app.use(basePath, baseRouter);

app.use((req, res, next) => {
  const error = new Error("route Not found..");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = app;
