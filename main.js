const config = require('./config');
const startup = require('./startup');

const express = require('express');
const bodyParser = require('body-parser');
const connectionFactory = require('./server/db/connection.factory');
const path = require('path');
const mongodb = require('mongodb');

const applicationRouter = require('./server/application.router');
const systemRouter = require('./server/system.router');
const publicRouter = require('./server/public.router');


const app = express();


process.setMaxListeners(0);


app.use(express.static('public'));
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.use('/api', applicationRouter);
app.use('/systemApi', systemRouter);
app.use('/publicApi', publicRouter);


app.use((req, res, next) => {
    if (req.method == "GET") {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    }else{
        next();
    }
});



app.listen(process.env.PORT | 3000, async () => {

    console.log("listening...");

    // var colorCollection = await connectionFactory.getCollection(colorService.collectionName);
    // var brandCollection = await connectionFactory.getCollection(brandService.collectionName);

    // // if no data add the test dat

    // if (await colorCollection.count() <= 0) {
    //     console.log('add colors and brands');
    //     var vehicleColors = vehicleColorGenerator();
    //     brandCollection.insertMany(vehicleBrands, (vehicleBrandError, vehicleBrandResult) => {
    //         colorCollection.insertMany(vehicleColors, (vehicleColorError, vehicleColorResult) => {




    //         });
    //     });

    // }


    // console.log('connecting to database');

    // var db = await connectionFactory.getDbConnection();

    // db.collection('vehicles').insertOne({ asd: "sdfsdf" });
});
