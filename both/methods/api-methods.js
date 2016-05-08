Meteor.methods({
  getBalance: function(walletAddress) {

    check(walletAddress, String);

    this.unblock();
    //TODO: Melhorar segurança do sistema - fazer chamada através do Server utilizando Session ou ReactVar
    Meteor.http.get("http://172.16.1.3:3000/smartcoin/v1/balance", {
      params: {
        token : "29430fce7797f2c90dc9dcdf4dbd67b0",
        walletAddress : walletAddress
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        if (response.data.statusCode == 200){
          if(Meteor.isServer){
            console.log(response.data.data);
          }else if (Meteor.isClient) {
            $('#balance').html(response.data.data.balance + " - " + response.data.data.btc + " - " + response.data.data.usd);
            //TODO: Exibir saldo dos projetos do usuário
            $('#walletAddress').html(response.data.data.walletAddress);
          }
        }
      }
    });
  }
});
