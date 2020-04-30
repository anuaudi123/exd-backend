const credentials = {
    client: {
      id: process.env.APP_ID,
      secret: process.env.APP_PASSWORD,
    },
    auth: {
      tokenHost: 'https://login.microsoftonline.com',
      authorizePath: 'common/oauth2/v2.0/authorize',
      tokenPath: 'common/oauth2/v2.0/token'
    }
};

const oauth2 = require('simple-oauth2').create(credentials);
const jwt = require('jsonwebtoken');
  
  function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.APP_SCOPES
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
  }

  async function getTokenFromCode(auth_code, res) {
    let result = await oauth2.authorizationCode.getToken({
      code: auth_code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.APP_SCOPES
    })
  
    const token = oauth2.accessToken.create(result);
    console.log('Token created: ', token.token);
    saveValuesToCookie(token, res);
    return token.token.access_token;
  }

  async function getTokenForAdmin(res) {
    let result = await oauth2.authorizationCode.getToken({
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    })
  
    const token = oauth2.accessToken.create(result);
    console.log('Token created: ', token.token);
    saveValuesToCookie(token, res);
    return token.token.access_token;
  }

  function saveValuesToCookie(token, res) {
    // Parse the identity token
    const user = jwt.decode(token.token.id_token);
    // Save the access token in a cookie
    res.cookie('access_token', token.token.access_token, {maxAge: 3600000, httpOnly: true});
    // Save the user's name in a cookie
    res.cookie('user_name', user.name, {maxAge: 3600000, httpOnly: true});
    res.cookie('expires_at', token.token.expires_at.getTime(), {maxAge: 3600000, httpOnly: true});
  }

  function clearCookies(res) {
    res.clearCookie('access_token', {maxAge: 3600000, httpOnly: true});
    res.clearCookie('user_name', {maxAge: 3600000, httpOnly: true});
    res.clearCookie('expires_at', {maxAge: 3600000, httpOnly: true});
    return true
  }

  async function getAccessToken(cookies, res) {
    let token = cookies.access_token;
  
    if (token) {
      // Expire 5 minutes early to account for clock differences
      const FIVE_MINUTES = 300000;
      const expiration = new Date(parseFloat(cookies.expires_at - FIVE_MINUTES));
      if (expiration > new Date()) {
        // Token is still good, just return it
        return token;
      }
    }
    // Either no token or it's expired, do we have a
    // refresh token?
    const refresh_token = cookies.refresh_token;
    if (refresh_token) {
      const newToken = await oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
      saveValuesToCookie(newToken, res);
      return newToken.token.access_token;
    }
    // Nothing in the cookies that helps, return empty
    return null;
  }
  
  module.exports = {
    getTokenFromCode: getTokenFromCode,
    getAuthUrl: getAuthUrl,
    clearCookies: clearCookies,
    getAccessToken: getAccessToken,
    getTokenForAdmin: getTokenForAdmin
  }
