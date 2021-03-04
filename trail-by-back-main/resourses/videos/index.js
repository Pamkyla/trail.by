const { dbFindHelperNormalin } = require("../../database/utils");

module.exports.getVideos = async (client) => {
  return await dbFindHelperNormalin(client, "videos", {});
}