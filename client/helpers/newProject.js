Template.newProject.events({
  'submit #newProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var newProject = {
      "ownerId" : Meteor.userId(),
      "name": $('#name').val(),
      "description": $('#description').val(),
      "image": "http://lorempixel.com/400/200/sports/", //TODO: Salvar imagem do upload feito pelo usuário
      "active": true,
      "walletAddress": "walletAddress",//TODO: gerar endereço da wallet pela API
    };

    Meteor.call('geoJsonForIp', '8.8.8.8', function( error, response ){
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "API testada com sucesso!", "success" );
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
      }

      console.log(res);
    });

    Meteor.call( "insertProject", newProject, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Projeto criado com sucesso!", "success" );
        BlazeLayout.render( 'default', { yield: 'dashboard' } );
      }
    });
  }
});
