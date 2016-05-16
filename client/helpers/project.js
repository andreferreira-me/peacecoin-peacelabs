Template.project.helpers({
  project: function () {
    var id = FlowRouter.getParam("_id");
    return Projects.findOne({ "_id" : id });
  }
});

Template.project.events({
  'click #removeProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");

    Meteor.call( "removeProject", projectId, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Projeto removido com sucesso!", "success" );
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
      }
    });
  }
});

Template.registerHelper('projectBalance', ( walletAddress ) => {
  if ( walletAddress ) {
    console.log(walletAddress);
    var promise = Meteor.callPromise("getBalance", walletAddress, false);
  }
});
