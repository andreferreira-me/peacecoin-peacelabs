Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId() });
  }
});
