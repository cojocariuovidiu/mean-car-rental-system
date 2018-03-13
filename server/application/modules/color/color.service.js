const connectionFactory = require('../../../db/connection.factory');
const collectionNames = require('../../../db/collectionNames');


async function getAll(appNumber) {
    var collection = await connectionFactory.getCollection(collectionNames.colorCollection + appNumber);

    var colors = collection.find();

    return colors.toArray();
}

module.exports = { getAll };