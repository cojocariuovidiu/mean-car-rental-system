const colorService = require('./color.service');
const express = require('express');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {

        var colors = await colorService.getAll(req.user.applicationNumber);

        res.status(200).send(colors);

    } catch (exc) {
        res.status(400).send(exc);
    }
});

module.exports = router;