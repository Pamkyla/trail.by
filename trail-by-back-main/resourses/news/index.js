const { dbFindHelperNormalin } = require("../../database/utils");

module.exports.getNews = async (client, filter) => {
  if (filter) return await dbFindHelperNormalin(client, "news", { filter });
  return await dbFindHelperNormalin(client, "news", {});
};
