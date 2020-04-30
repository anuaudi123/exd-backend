var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');

/* GET /authorize. */
router.get('/', async function(req, res, next) {
    const code = req.query.code;
  
    if (code) {
      let token;
  
      try {
        token = await authHelper.getTokenFromCode(code, res);
        var response_data = {
            access_token: token,
            success: true
        }
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response_data));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.end(JSON.stringify({'error': error.message}));
      }
    } else {
      res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
  });

module.exports = router;