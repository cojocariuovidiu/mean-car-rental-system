const vehicleFeatureService = require('./vehicleFeature.service');
const express = require('express');


const router = express.Router();

router.get('/all', async (req, res) => {

    var serviceResult = await vehicleFeatureService.getAll(req.user.applicationNumber);

    if (serviceResult.success)
        res.status(200).send(serviceResult.data);
    else
        res.status(500).send(serviceResult.message);

});





module.exports = router;