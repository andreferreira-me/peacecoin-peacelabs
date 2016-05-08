Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId(), "active" : true } );
  },
  myBalance: ReactivePromise(function () {
    var promise = Meteor.callPromise("getBalance", "0xa50e6Cc7b4D4aa6039346C82414FD2E24Adc7c3E");
    //TODO: passar carteira do usuário como parâmetro
    return promise;
  })
});
