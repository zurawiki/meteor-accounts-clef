Accounts.registerLoginHandler('clef', function (loginRequest) {
    if (!loginRequest.clef) {
      return undefined;
    }

    check(loginRequest.clef, String); // clef code

    var config = ServiceConfiguration.configurations.findOne({
      service: 'clef'
    });
    if (!config) {
      throw new ServiceConfiguration.ConfigError();
    }

    var loginUrl = Clef._server + "/api/v1/authorize";
    data = {
      code: loginRequest.clef,
      app_id: config.clientId,
      app_secret: config.secret
    };
    // TODO error handling
    var res = HTTP.post(loginUrl, {params: data});
    var token = res.data.access_token;
    console.log('Clef login with token: ', token);

    // TODO error handling
    var infoUrl = Clef._server + "/api/v1/info";
    var res = HTTP.get(infoUrl, {params: {access_token: token}});
    var clef_id = res.data.info;
    var profile = {profile: clef_id};
    profile.profile.name = clef_id.first_name + ' ' + clef_id.last_name;

    return Accounts.updateOrCreateUserFromExternalService('clef',
      clef_id, profile);
  }
);
Accounts.addAutopublishFields({
  // publish all fields including access token, which can legitimately
  // be used from the client (if transmitted over ssl or on
  // "Sharing of Access Tokens"
  forLoggedInUser: ['services.clef'],
  forOtherUsers: [
    'services.clef.id'
  ]
});
Meteor.methods({
  clef_app_id: function () {
    var config = ServiceConfiguration.configurations.findOne({
      service: 'clef'
    });
    if (!config) {
      throw new ServiceConfiguration.ConfigError();
    }

    return config.clientId;
  }
});