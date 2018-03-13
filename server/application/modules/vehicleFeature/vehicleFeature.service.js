var connectionFactory = require('../../../db/connection.factory');
var collectionNames = require('../../../db/collectionNames');

async function getAll(appNumber) {

    try {
        var featureCollection = await connectionFactory.getCollection(collectionNames.vehicleFeatureCollection + appNumber);

        var features = await featureCollection.find().toArray();

        return { success: true, data: features };

    } catch (exception) {
        return { success: false, message: "Araç özellikleri alınırken bir hata oluştur" }
    }

}

async function getById(featureId, appNumber) {

}

async function add(feature, appNumber) {

}

async function update(feature, appNumber) {

}




module.exports = { getAll, add, update };