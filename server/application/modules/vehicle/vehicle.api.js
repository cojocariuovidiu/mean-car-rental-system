const vehicleService = require('./vehicle.service');
const express = require('express');
const router = express.Router();

router.post('/paged', async (req, res) => {

    var vehiclePagedResult;

    try {
        vehiclePagedResult = await vehicleService.getPaged(req.body, req.user.applicationNumber);

        res.status(200).send(vehiclePagedResult);
    }
    catch (exception) {
        res.status(400).send(exception);
    }

});

router.post('/add', async (req, res) => {
    try {
        var insertOneWriteResult = await vehicleService.add(req.body);

        res.status(200).send(insertOneWriteResult);


    } catch (exception) {
        res.status(400).send(exception);
    }
});

router.get('/byNumber/:number', async (req, res) => {
    try {

        var vehicleNumber = Number(req.params.number);

        var vehicle = await vehicleService.getByNumber(vehicleNumber);

        res.status(200).send(vehicle);
    }
    catch (exception) {
        res.status(400).send(exception);
    }


});


router.post('/file/:vehicleId', (req, res) => {
    vehicleService.uploadVehicleFile(req, res);
});

router.post('/file', (req, res) => {
    vehicleService.uploadVehicleFile(req, res);
});

router.get('/file/:id', (req, res) => {

    var fileId = req.params["id"];

    vehicleService.downloadVehicleFile(req, res);


});


module.exports = router;