Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId(), "isActive" : true } );
  },
  myBalance: ReactivePromise(function () {
    var user = Meteor.users.findOne({"_id" : Meteor.userId()});

    var promise = Meteor.callPromise("getBalance", user.profile.walletAddress);

    return promise;
  })
});
