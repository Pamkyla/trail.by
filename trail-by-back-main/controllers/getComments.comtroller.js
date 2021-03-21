"use strict";

const { getComments } = require("../resourses/comments");

module.exports = async (req, res) => {
  const newsId = req.query.id;
  const client = req.app.locals.mongoPanel;
  let data = await getComments(newsId, client);
  res.send(data);
};
