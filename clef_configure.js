Template.configureLoginServiceDialogForClef.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForClef.fields = function () {
  return [
    {property: 'clientId', label: 'Application ID'},
    {property: 'secret', label: 'Application secret'}
  ];
};

