Meteor.methods({
  getBalance: function(walletAddress) {

    check(walletAddress, String);

    this.unblock();

    Meteor.http.get("http://172.16.1.3:3000/smartcoin/v1/balance", {
      params: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        walletAddress: walletAddress
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {
          if (Meteor.isServer) {
            console.log(response.data.data);
          } else if (Meteor.isClient) {
            $('#balance').html(response.data.data.balance + " - " + response.data.data.btc + " - " + response.data.data.usd);
            //TODO: Exibir saldo dos projetos do usuário
            $('#walletAddress').html(response.data.data.walletAddress);
          }
        }
      }
    });
  },
  postCollaborator: function(cpf, name) {

    check(cpf, String);
    check(name, String);
    this.unblock();

    Meteor.http.post("http://172.16.1.3:3000/smartcoin/v1/collaborator", {
      data: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        cpf: cpf,
        name: name
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {
          var user = Meteor.users.findOne({
            'profile.cpf': cpf
          });

          Meteor.users.update({
            '_id': user._id
          }, {
            $set: {
              "profile.walletAddress": response.data.data.walletAddress
            }
          });
        }
      }
    });
  },
  postProject: function(projectId, name, description) {

    check(projectId, String);
    check(name, String);
    check(description, String);
    this.unblock();

    Meteor.http.post("http://172.16.1.3:3000/smartcoin/v1/project", {
      data: {
        token: "29430fce7797f2c90dc9dcdf4dbd67b0",
        projectId: projectId,
        name: name,
        description: description
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {

          Projects.update({
            '_id': projectId
          }, {
            $set: {
              "walletAddress": response.data.data.walletAddress
            }
          });

        }
      }
    });
  }
});
