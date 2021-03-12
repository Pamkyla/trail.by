"use strict";

const { getFilters } = require("../resourses/filters");

module.exports = async (req, res) => {
  const client = req.app.locals.mongoPanel;
  const filter = req.query.filter;
  let data = await getFilters(filter, client);
  res.send(data);
};
