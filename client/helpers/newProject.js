Template.newProject.events({
  'submit #newProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var newProject = {
      "ownerId" : Meteor.userId(),
      "name": $('#name').val(),
      "description": $('#description').val(),
      "image": "http://lorempixel.com/400/200/sports/", //TODO: Salvar imagem do upload feito pelo usuário
      "status": "Ativo", //TODO: fazer ENUM para Status
      "walletAddress": "walletAddress",//TODO: pegar balance pela API
      "balance": 0 //TODO: pegar balance pela API
    };

    Meteor.call( "insertProject", newProject, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Projeto criado com sucesso!", "success" );
      }
    });
  }
});
