const express = require('express');
const router = express.Router();
const appUserService = require('./system/modules/appUser/appUser.service');
const systemUserService = require('./system/modules/systemUser/systemUser.service');
const jwt = require('jsonwebtoken');


router.post('/appLogin', async (req, res) => {
    var serviceResult;
    try {
        serviceResult = await appUserService.getUserByCredentials(req.body.username, req.body.password);

    } catch (exception) {
        res.status(400).send("Kullanıcı doğrulaması sırasında bir hata meydana geldi.");
    }

    if (serviceResult.success) {

        var token;
        if (req.body.remember) {
            token = jwt.sign({ _id: serviceResult.data.userData._id }, global.config.jwtSecret);
        } else {
            token = jwt.sign({ _id: serviceResult.data.userData._id }, global.config.jwtSecret, { expiresIn: '1d' });
        }

        var updateresult = await appUserService.updateAuthToken(serviceResult.data.userData._id, token);


        if (updateresult.success)
            res.status(200).cookie("app-auth-token", token).send();
        else
            res.status(500).send("Kullanıcı doğrulaması sırasında bir hata meydana geldi.");

    } else {
        res.status(500).send(serviceResult.message);

    }

});

router.get('/user/:token', async (req, res) => {
    var token = req.params["token"];

    var serviceResult;

    try {

        try {
            var userInfo = jwt.verify(token, global.config.jwtSecret);

            serviceResult = await appUserService.getById(userInfo._id);

            if (serviceResult.success)
                res.status(200).send(serviceResult.data);
            else
                res.status(500).send(serviceResult.message);

        } catch (exception) {
            res.status(200).send(null);
        }

    } catch (exception) {
        res.status(400).send();
    }
});

router.post('/systemLogin', (req, res) => {

})




module.exports = router;