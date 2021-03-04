"use strict";

const { getNews } = require("../resourses/news");

module.exports = async (req, res) => {
  const client = req.app.locals.mongoPanel;
  const filter = req.query.filter;
  let data = await getNews(client, filter);
  res.send(data);
};
