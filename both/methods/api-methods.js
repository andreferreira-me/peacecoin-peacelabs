Meteor.methods({
  getBalance: function(walletAddress, user) {

    check(walletAddress, String);
    check(user, Boolean);

    this.unblock();

    Meteor.http.get("http://localhost:3002/smartcoin/v1/balance", {
      params: {
        token: "ece5b0c83732411177ed83e895e527fa",
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
            $('#myBalance').html(response.data.data.balance + " - " + response.data.data.btc + " - " + response.data.data.usd);
            $('#projectBalance').html(response.data.data.balance + " - " + response.data.data.btc + " - " + response.data.data.usd);

            if (user)
              $('#myWalletAddress').html(response.data.data.walletAddress);

          }
        }
      }
    });
  },
  getProject: function(userId) {

    check(userId, String);

    this.unblock();

    Meteor.http.get("http://localhost:3002/smartcoin/v1/project", {
      params: {
        token: "ece5b0c83732411177ed83e895e527fa",
        userId: userId
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200) {
          if (Meteor.isServer) {
            console.log(response.data.data);
          } else if (Meteor.isClient) {
            $('#projectBalanceSum').html(response.data.data.balance + " - " + response.data.data.btc + " - " + response.data.data.usd);
          }
        }
      }
    });
  },
  postCollaborator: function(cpf, name) {

    check(cpf, String);
    check(name, String);
    this.unblock();

    Meteor.http.post("http://localhost:3002/smartcoin/v1/collaborator", {
      data: {
        token: "ece5b0c83732411177ed83e895e527fa",
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
  postProject: function(projectId, name, description, userId) {

    check(projectId, String);
    check(name, String);
    check(description, String);
    check(userId, String);
    this.unblock();

    Meteor.http.post("http://localhost:3002/smartcoin/v1/project", {
      data: {
        token: "ece5b0c83732411177ed83e895e527fa",
        projectId: projectId,
        name: name,
        description: description,
        userId: userId
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
