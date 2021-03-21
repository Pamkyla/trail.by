'use strict';

const { postVideo } = require("../resourses/videos");

module.exports = async (req, res) => {
  const client = req.app.locals.mongoPanel;
  const caption = req.query.caption;
  const url = req.query.url;
  if (await  postVideo(client, caption, url)) {
    res.send("ok");
  } else {
    res.send("false");
  }
}