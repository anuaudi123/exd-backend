var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');


/* GET /authorize. */
router.get('/', async function(req, res, next) {
    const accessToken = await authHelper.getTokenForAdmin(res);
    console.log(accessToken);
  });

module.exports = router;