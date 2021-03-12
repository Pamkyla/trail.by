const { dbFindHelperNormalin } = require("../../database/utils");

module.exports.getFilters = async (filter, client) => {
  return await dbFindHelperNormalin(client, "filters", { filter });
};
