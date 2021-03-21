const {
  dbAddHelperNormalin,
  dbFindHelperNormalin,
} = require("../../database/utils");

module.exports.addComment = async (
  name,
  email,
  text,
  raiting,
  newsId,
  client
) => {
  let data = {
    name,
    email,
    text,
    raiting,
    newsId,
  };
  return (await dbAddHelperNormalin("comments", data, client)).result.ok;
};

module.exports.getComments = async (newsId, client) => {
  return await dbFindHelperNormalin(client, "comments", { newsId });
};
