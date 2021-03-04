const dbName = "trail-by";

module.exports.dbFindHelperNormalin = async (client, collection, findObj) => {
  let data = await client
    .db(dbName)
    .collection(collection)
    .find(findObj)
    .toArray();
  return data;
};

module.exports.dbAddHelperNormalin = async (collection, data, client) => {
  return await client.db(dbName).collection(collection).insertOne(data);
};
