Package.describe({
  name: 'roger:accounts-clef',
  summary: 'Login service for Clef accounts',
  version: '0.0.1',
  git: 'https://github.com/zurawiki/meteor-accounts-clef.git'
});

Package.onUse(function (api) {
  api.versionsFrom('1.0.2.1');
  api.imply('accounts-base', ['client', 'server']);

  api.use(['underscore', 'service-configuration', 'oauth', 'accounts-oauth'],
    ['client', 'server']);
  api.use(['random', 'templating'], 'client');
  api.use('http', 'server');


  api.export('Clef');

  //
  // Common  files
  //
  api.addFiles('clef_common.js');
  //
  // Client side files
  //
  api.addFiles([
    'clef_configure.html',
    'clef_configure.js',
    'clef_client.js',
    'clef-login-button.css'], 'client');
  //
  // Server only files
  //
  api.addFiles('clef_server.js', 'server');

});
