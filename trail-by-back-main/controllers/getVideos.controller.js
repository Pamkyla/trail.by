"use strict";

const { getVideos } = require("../resourses/videos");

module.exports = async (req, res) => {
  const client = req.app.locals.mongoPanel;
  let data = await getVideos(client);
  res.send(data);
} 