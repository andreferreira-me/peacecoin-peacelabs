Template.dashboard.helpers({
  myProjects: function () {
    return Projects.find({ "ownerId" : Meteor.userId(), "active" : true } );
  }
});

Template.dashboard.events({
  'click #testeAPI'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    Meteor.call("getBalance", "0x910ca8702e41f46c4bf5b801e1b70f2ffca9d0fe", function(error, results) {
        console.log(results.content); //results.data should be a JSON object
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
