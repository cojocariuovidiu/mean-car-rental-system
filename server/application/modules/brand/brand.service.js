const connectionFactory = require('../../../db/connection.factory');
const collectionNames = require('../../../db/collectionNames');

async function getBrands(appNumber) {

    try {

        var collection = await connectionFactory.getCollection(collectionNames.brandCollection + appNumber);

        var brands = await collection.find().toArray();

        return {
            success: true, data: brands
        };
    } catch (exception) {
        return { success: false, message: "Markaları alırken bir hata meydana geldi." }
    }
}

module.exports = { getBrands };