Template.searchProjects.helpers({
  projects: function () {
    return Projects.find({ "isActive" : true });
  }
});
