Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId(), "active" : true } );
  }
});

Template.dashboard.events({
  'click #testeApiGet'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    $.ajax({
      method: "GET",
      url: "http://172.16.1.3:3000/smartcoin/v1/validaToken?token=b07f2b3dbab6d6799732d39586c5496e",
      contentType: "application/json",
      crossDomain: true,
    }).done(function(data) {
      console.log(data);
    });
  },
  'click #testeApiPost'(event) {
    event.preventDefault();

    $.ajax({
      method: "POST",
      url: "http://172.16.1.3:3000/smartcoin/v1/validaToken/",
      crossDomain: true,
      dataType: "json",
      data: {
        token: "tatata",
        teste: "gafssdf",
        name: "fksjdfnkgb"
      }
    }).done(function(data) {
      $( "#result" ).html( data.msg );
    });
  }
});
