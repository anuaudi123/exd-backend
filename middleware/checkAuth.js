"use strict";
var cookie = require('cookie');
var authHelper = require('../helpers/auth');

module.exports = function(req, res, next) {
  // skip the session validation for healthCheck & pdf url
    var path = req._parsedUrl.pathname
    if ((!req.headers.referer) || req.querypath === '/graphiql' || path === '/uploads' || path === '/public/healthCheck' || path === '/authorize') {
        return next();
    }

    // Allowing users to access only getToken and and getLoginURL API's
    var req_headers = req.headers.referer
    if(req_headers.includes('graphiql') && !req_headers.includes('query')){
        return next();
    }

    if (req_headers.includes('query') && (req_headers.includes('getToken') || req_headers.includes('getLoginUrl'))){
       return next(); 
    }

   // Check wether the user has an authorization

    if(req.headers.cookie){
        var cookies = cookie.parse(req.headers.cookie)
        const accessToken = authHelper.getAccessToken(cookies, res);
        const userName = cookies.user_name;

        if (accessToken && userName) {
        return next();
        }
    } 
        var response_data = {
            "signInUrl": authHelper.getAuthUrl(),
            "error": "Invalid Session"
         }
        res.status(401)
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response_data));
};