Accounts.oauth.registerService('clef', 2, null, function () {
  //console.debug('TODO implement with oauth base package');
});

Clef = {};
Clef._server = "https://clef.io";

// Options are:
//  - developerAccountsServer: defaults to "https://clef.io"
Clef._config = function (options) {
  if (options.developerAccountsServer) {
    Clef._server = options.developerAccountsServer;
  }
};