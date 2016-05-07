Meteor.methods({

  getBalance: function(walletAddress) {

    this.unblock();

    return Meteor.http.get("http://172.16.1.3:3000/smartcoin/v1/balance", {
      params: {
        token : "a11c72d98663d16ee5d9900c27b23603",
        walletAddress : walletAddress
      }
    }, function(error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    });
  }
});
