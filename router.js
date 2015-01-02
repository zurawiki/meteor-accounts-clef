Clef._ROOT_ROUTE = '/_clef';

Router.map(function () {
    this.route(Clef._ROOT_ROUTE + '/auth', function () {
        console.error(this.params.query);
        Accounts.callLoginMethod({methodArguments: [{clef: this.params.query.code}]});
        return this.redirect('/');


    })
});
