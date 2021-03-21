"use strict";

const { addComment } = require("../resourses/comments");

module.exports = async function (req, res) {
  const name = req.query.name;
  const email = req.query.email;
  const text = req.query.text;
  const raiting = req.query.rating;
  const newsId = req.query.id;
  const client = req.app.locals.mongoPanel;
  if (await addComment(name, email, text, raiting, newsId, client)) {
    res.send("ok");
  } else {
    res.send("false");
  }
};
