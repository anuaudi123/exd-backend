var graph = require('@microsoft/microsoft-graph-client');
var authHelper = require('../helpers/auth');

function syncUsers() {
    
    const accessToken = await authHelper.getTokenForAdmin(res);
    const userName = req.cookies.graph_user_name;

  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });

    try {
      // Get the 10 newest messages from inbox
      const result = await client
      .api('/users')
      .get();
      console.log(result);
      parms.debug = `Graph request returned: ${JSON.stringify(result, null, 2)}`;
    } catch (err) {
      parms.message = 'Error retrieving messages';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.end('error', parms);
    }

  } else {
    // Redirect to home
    res.redirect('/');
  }

  res.render('index', parms);
}

module.exports = {
    syncUsers: syncUsers
}