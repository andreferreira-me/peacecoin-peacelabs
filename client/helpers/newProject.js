Template.newProject.events({
  'submit #newProject'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    var newProject = {
      "ownerId": Meteor.userId(),
      "name": $('#name').val(),
      "description": $('#description').val(),
      "image": "http://lorempixel.com/400/200/sports/", //TODO: Salvar imagem do upload feito pelo usuário
      "isActive": true,
      "walletAddress": ""
    };



    Meteor.call( "insertProject", newProject, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {

        Modules.client.uploadToAmazonS3( { event: event, template: template, projectId : response } );

        Meteor.call("postProject", response, $('#name').val(), $('#description').val());

        Bert.alert( "Projeto criado com sucesso!", "success" );
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
      }
    });
  }
});
