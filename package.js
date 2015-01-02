Package.describe({
  name: 'roger:accounts-clef',
  summary: 'Login service for Clef accounts',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.use('http', ['server']);
  api.use(['random', 'templating'], 'client');

  //api.use('iron:router', ['client', 'server']);


  api.export('Clef');

  api.addFiles('clef_common.js');
  api.addFiles(['clef_configure.html', 'clef_configure.js'], 'client');
  api.addFiles('clef_server.js', 'server');
  api.addFiles("clef-login-button.css", "client");
  //api.addFiles('router.js');

});
