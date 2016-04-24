Template.searchProjects.helpers({
  projects: function () {
    return Projects.find({ "active" : true });
  }
});
