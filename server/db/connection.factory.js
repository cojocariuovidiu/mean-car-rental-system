const mongodb = require('mongodb');

const dbName = "meanrentacar";
const connectionString = global.config.connectionString;

function getDbConnection() {

    return new Promise((resolve, reject) => {
        mongodb.MongoClient.connect(connectionString, (err, client) => {
            if (err)
                reject(err);
            else {
                resolve(client.db(dbName));
            }

        });

    });
}

async function getCollection(collectionName) {
    var db = await getDbConnection();

    return db.collection(collectionName);
}

module.exports = { dbName, connectionString, getDbConnection, getCollection };
