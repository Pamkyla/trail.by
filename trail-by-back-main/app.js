var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const MongoClient = require("mongodb").MongoClient;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const newsRouter = require("./routes/news");
const postCommentRouter = require("./routes/postComment");
const getCommentsRouter = require("./routes/comments");
const getVideosRouter = require("./routes/videos");

const mongoPanel = new MongoClient(
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useUnifiedTopology: true }
);

mongoPanel.connect((err, client) => {
  if (err) return console.log(err);
  app.locals.mongoPanel = client;
});

var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/news", newsRouter);
app.use("/comment", postCommentRouter);
app.use("/comments", getCommentsRouter);
app.use("/videos", getVideosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

process.on("SIGINT", () => {
  app.locals.mongoPanel.close();
  process.exit();
});

module.exports = app;
