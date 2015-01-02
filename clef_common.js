Accounts.oauth.registerService('clef', 2, null, function () {
    console.log('handling');
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

if (Meteor.isClient) {
    if (window.location.pathname === '/_clef/auth') {
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }

        Accounts.callLoginMethod({methodArguments: [{clef: getUrlParameter('code')}]})
    }

    // HACKY hijacks accounts-ui template
    Template._loginButtonsLoggedOutSingleLoginButton.rendered = function () {
        if (this.data.name !== 'clef')
            return undefined;

        Meteor.call('clef_app_id', function (e, appId) {
            if (!e) {
                $('#login-buttons-clef').after('<div class="clef-wrapper">' +
                '<script data-type="connect" data-redirect-url="' + Meteor.absoluteUrl() +
                '_clef/auth" data-style="flat" data-color="white"' +
                'data-app-id="' + appId + '" class="clef-button"></script></div>' +
                '<script type="text/javascript" src="https://clef.io/v3/clef.js"></script>').remove();
            }
        });

    };
}
if (Meteor.isServer) {
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
            if (!config)
                throw new ServiceConfiguration.ConfigError();

            return config.clientId;
        }
    });
}
