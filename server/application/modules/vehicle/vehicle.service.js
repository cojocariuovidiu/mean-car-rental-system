const connectionFactory = require('../../../db/connection.factory');
const dataValidator = require('../../dataValidator');
const _ = require('lodash');
const mongodb = require('mongodb');
const fs = require('fs');
const collectionNames = require('../../../db/collectionNames');


var _maxVehicleNumber;
async function getMaxVehicleNumber(appNumber) {

    if (_maxVehicleNumber === undefined) {
        // initialize max vehicle number
        var collection = await connectionFactory.getCollection(collectionNames.vehicleCollection + appNumber);

        var maxVehicle = await collection.find().sort({ number: -1 }).limit(1).next();

        if (maxVehicle)
            _maxVehicleNumber = maxVehicle.vehicleNumber;
        else
            _maxVehicleNumber = 0;
    }
    //

    return ++_maxVehicleNumber;
}

function setFeatures(vehicle) {
    if (vehicle.features) {

        var outstanding = vehicle.features.filter(x => !!x.outstanding);

        if (outstanding.length > 3) {
            while (outstanding.length > 3) {
                outstanding.pop();
            }
        } else if (outstanding.length < 3) {
            var nonOutstanding = vehicle.features.filter(x => !x.outstanding);

            if (outstanding.length + nonOutstanding.length > 3) {
                while ((outstanding.length + nonOutstanding.length) > 3) {
                    nonOutstanding.pop();
                }
            }

            outstanding = outstanding.concat(nonOutstanding);
        }

        var features = outstanding.map(x => x.feature.name).join(" - ");
        vehicle.features = features;
    }
}

async function getPaged(filterObject, appNumber) {

    var vehicleCollection = await connectionFactory.getCollection(collectionNames.vehicleCollection + appNumber);

    var vehicleCount = await vehicleCollection.count();

    return new Promise((resolve, reject) => {

        var sortObject = filterObject.sort ? { $sort: filterObject.sort } : null;

        console.log(filterObject);

        vehicleCollection.aggregate(
            [
                {
                    $addFields: {
                        latestPlate:
                            {
                                $arrayElemAt: ["$plateHistory", { $indexOfArray: ["$plateHistory.dateFrom", { $max: "$plateHistory.dateFrom" }] }]
                            },

                    },
                },
                {

                    $addFields: {
                        plate: "$latestPlate.plate"
                    }
                },
                sortObject,
                {
                    $skip: filterObject.skip
                },
                {
                    $limit: filterObject.limit
                },
                {
                    $addFields:
                        {
                            "colorName": "$color.name",
                            "brandName": "$brand.name",
                            "brandModelName": "$brandModel.name"
                        }
                },
                {
                    $project:
                        {
                            "vehicleColor": 0,
                            "vehicleBrand": 0,
                            "vehicleBrandModel": 0,

                        }
                }
            ], async (error, result) => {
                if (error)
                    reject(error);
                else {

                    var data = await result.toArray();

                    for (var i = 0; i < data.length; i++) {
                        setFeatures(data[i]);
                    }

                    resolve({ data, total: vehicleCount });

                }
            });


    });
}

async function getByNumber(vehicleNumber, appNumber) {

    var serviceResult = {};

    var vehicleCollection = await connectionFactory.getCollection(collectionNames.vehicleCollection + appNumber);

    var vehicle = await vehicleCollection.findOne({ "number": vehicleNumber });

    if (vehicle) {

        vehicle.plate = _.maxBy(vehicle.plateHistory, y => new Date(y.dateFrom.toString()).getTime()).plate;

        serviceResult = { success: true, data: vehicle }
    } else {
        serviceResult = { success: true, data: null }
    }

    return serviceResult;
}

async function add(vehicle, appNumber) {

    var collection = await connectionFactory.getCollection(collectionNames.vehicleCollection + appNumber);

    if (!vehicle.files)
        vehicle.files = [];
    vehicle.vehicleNumber = await getMaxVehicleNumber();

    return new Promise((resolve, reject) => {

        collection.insertOne(vehicle, {}, (error, result) => {
            if (error)
                reject(error);
            else {
                resolve(result);
            }
        });
    });

}

async function update(vehicle, appNumber) {
    var collection = await connectionFactory.getCollection(collectionNames.vehicleCollection + appNumber);

    vehicle._id = new mongodb.ObjectID(vehicle._id);

    var updateResult = await collection.updateOne(
        {
            "_id": vehicle._id
        },
        {
            $set: vehicle
        });

    if (updateResult.result.ok && updateResult.result.ok == 1) {
        return { success: true, data: updateResult }

    } else {
        return { success: false, message: "Araç güncellenemedi." };
    }
}




async function uploadVehicleFile(req, res) {

    var db = await connectionFactory.getDbConnection();
    var gridFsBucket = new mongodb.GridFSBucket(db, { bucketName: collectionNames.vehicleFileBucket + req.user.applicationNumber });

    var extractedFileName, extractedContentType;

    var uploadStream;

    var firstChunk = true;
    var lengthTotal = 0;
    req.on('data', (incoming) => {

        lengthTotal += incoming.length;

        // first chunk
        if (!extractedFileName && !extractedContentType) {

            var stringIncoming = incoming.toString();
            // get file name from file data
            var fileNameIndex = stringIncoming.indexOf("filename");
            if (fileNameIndex >= 0) {
                var fileNameTag = "filename=";
                var startIndex = fileNameTag.length + 1 + fileNameIndex;
                extractedFileName = stringIncoming.substring(startIndex, stringIncoming.indexOf("\"", startIndex + 1));
            }
            // get content type from file
            var contentTypeIndex = stringIncoming.indexOf("Content-Type");
            if (contentTypeIndex >= 0) {
                var contentTypeTag = "Content-Type:";
                var contentTypeStartIndex = contentTypeTag.length + 1 + contentTypeIndex;
                extractedContentType = stringIncoming.substring(contentTypeStartIndex, stringIncoming.indexOf("\r", contentTypeStartIndex + 1));
            }

        }
        if (firstChunk === true) {
            uploadStream = gridFsBucket.openUploadStream(extractedFileName, { contentType: extractedContentType });
            firstChunk = false;

            uploadStream.on('finish', () => {
                console.log('file saved to database.');
            });
        }


        var result = uploadStream.write(incoming);

        if (!result) {
            uploadStream.once('drain', () => {
            });

        }



    });

    req.on('end', () => {
        uploadStream.end(async () => {
            console.log('all data is saved.');

            var file = await gridFsBucket.find({ "_id": uploadStream.id }).next();

            if (req.params["vehicleId"]) {
                var vehicleId = new mongodb.ObjectID(req.params["vehicleId"]);

                var vehicleCollection = await connectionFactory.getCollection(collectionNames.vehicleCollection + req.user.applicationNumber);

                var update = await vehicleCollection.update({ "_id": vehicleId }, { $push: { "files": file } });


            }
            res.status(200).send(file);



        });
    });


}


async function downloadVehicleFile(req, res) {

    var db = await connectionFactory.getDbConnection();
    var gridFsBucket = new mongodb.GridFSBucket(db, { bucketName: collectionNames.vehicleFileBucket + req.user.applicationNumber });

    var objectId = new mongodb.ObjectID(req.params["id"]);


    var downloadStream = gridFsBucket.openDownloadStream(objectId);

    var fileInfo = await gridFsBucket.find({ "_id": objectId }).next();


    res.set('Content-Type', "application/octet-stream");
    downloadStream.pipe(res);

    res.on('finish', () => {
        res.status(200).send();
    });
}





module.exports = { add, update, getPaged, getByNumber, uploadVehicleFile, downloadVehicleFile };