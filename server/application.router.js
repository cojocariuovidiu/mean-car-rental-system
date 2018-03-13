const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const vehicleApi = require('./application/modules/vehicle/vehicle.api');
const colorApi = require('./application/modules/color/color.api');
const brandApi = require('./application/modules/brand/brand.api');
const vehicleFeatureApi = require('./application/modules/vehicleFeature/vehicleFeature.api');

const appUserService = require('./system/modules/appUser/appUser.service');
const applicationService = require('./system/modules/application/application.service');


router.use(async (req, res, next) => {

    console.log('api router...' + req.originalUrl);

    var authToken = req.get('app-auth-token');

    try {
        var userInfo = jwt.verify(authToken, global.config.jwtSecret);

        userServiceResult = await appUserService.getById(userInfo._id);

        if (userServiceResult.success) {
            var appId = userServiceResult.data.applicationId;


            appServiceResult = await applicationService.getById(appId);

            var user = userServiceResult.data;
            user.applicationNumber = appServiceResult.data.applicationNumber;
            req.user = user;
        }
        else {
            res.status(403).send();
            return;
        }

    } catch (exception) {
        res.status(403).send();
        return;
    }

    next();
});

router.use("/vehicle", vehicleApi);
router.use("/color", colorApi);
router.use("/brand", brandApi);
router.use("/vehicleFeature", vehicleFeatureApi);


module.exports = router;