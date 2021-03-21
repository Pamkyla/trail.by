const {
  dbFindHelperNormalin,
  dbAddHelperNormalin,
} = require("../../database/utils");

module.exports.getVideos = async (client) => {
  return (await dbFindHelperNormalin(client, "videos", {})).map((el) => {
    el.url = el.url.replace(/watch\?v=/, "embed/");
    return el;
  });
};

module.exports.postVideo = async (client, caption, url) => {
  let data = {
    caption,
    url,
  };
  return await dbAddHelperNormalin("videos", data, client);
};
