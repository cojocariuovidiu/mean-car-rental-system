const connectionFactory = require('../../../db/connection.factory');
const collectionNames = require('../../../db/collectionNames');

var _maxApplicationNumber;
async function getMaxApplicationNumber() {

    if (_maxApplicationNumber === undefined) {
        // initialize max vehicle number
        var collection = await connectionFactory.getCollection(collectionNames.applicationCollection);

        var maxApp = await collection.find().sort({ applicationNumber: -1 }).limit(1).next();

        if (maxApp)
            _maxApplicationNumber = maxApp.applicationNumber;
        else
            _maxApplicationNumber = 0;
    }
    //

    return ++_maxApplicationNumber;
}


async function add(application) {


    var collection = await connectionFactory.getCollection(collectionNames.applicationCollection);

    var maxAppNumber = getMaxApplicationNumber();

    application.applicationNumber = getMaxApplicationNumber;


    var result = await collection.insertOne(application);

    return { success: true, data: result.ops[0] };

}

async function getById(appId) {
    try {

        var collection = await connectionFactory.getCollection(collectionNames.applicationCollection);

        var application = await collection.findOne({ "_id": appId });

        return { success: true, data: application };

    } catch (exception) {
        return { success: false, message: exception };
    }
}

module.exports = { add, getById }