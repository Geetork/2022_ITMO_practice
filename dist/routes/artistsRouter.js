"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const artistsRouter = express.Router();
artistsRouter.use(bodyParser.json());
artistsRouter.route('artists')
    .get((req, res, next) => {
    res.send('hello');
});
module.exports = artistsRouter;
i;
