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
          console.log("user: " + JSON.stringify(user));

          Meteor.users.update({
            _id: user._id
          }, {
            $set: {
              "profile.walletAddress": response.data.data.walletAddress
            }
          });

          /*
          if(Meteor.isServer){
            console.log("server: ");
            console.log(response.data.data);
            Session.set('walletAddress', response.data.data.walletAddress);
          }else if(Meteor.isClient){
            console.log(response.data.data);
            return response.data.data.walletAddress;
            Session.set('walletAddress', response.data.data.walletAddress);
          }
          */
        }
      }
    });
  }
});
