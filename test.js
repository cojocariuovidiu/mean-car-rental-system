// var _ = require('lodash');
// var mongodb = require('mongodb');


// const dbName = "dokuzisikmean";
// const connectionString = "mongodb://localhost:27017";


// mongodb.MongoClient.connect(connectionString, (err, client) => {

//     var vehicle = client.db(dbName).collection('vehicles').findOne({ vehicleNumber: 3 }).then(x => {
//         console.log(x);

//         console.log(new Date(x.nextExaminationDate.toString()).getTime())

//     });

// })



// vehicle.plate = _.find(vehicle.plateHistory, (x) => { new Date(x.dateFrom).getTime() === _.maxBy(vehicle, y => new Date(y.dateFrom).getTime()) }).plate;