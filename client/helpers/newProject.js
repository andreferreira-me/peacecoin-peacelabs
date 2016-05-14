Template.newProject.events({
  'submit #newProject'(event) {
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

        var project = Meteor.call("postProject", newProject.name, newProject.description);

        Bert.alert( "Projeto criado com sucesso!", "success" );
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
      }
    });
  }
});
