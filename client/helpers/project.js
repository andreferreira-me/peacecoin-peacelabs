Template.project.helpers({
  project: function () {
    var id = FlowRouter.getParam("_id");
    return Projects.findOne({ "_id" : id });
  },
  ownerProject: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId == Meteor.userId()) {
      return project;
    }else{
      return null;
    }
  },
  myBalance: function () {
    var user = Meteor.users.findOne({"_id" : Meteor.userId()});

    var balance = Meteor.call("getBalance", user.profile.walletAddress, true);

    return balance;
  },
  projectActivities: function () {
    var projectId = FlowRouter.getParam("_id");

    console.log(projectId);

    return Activities.find({ "projectId": projectId});
  }
});

Template.projectActivity.helpers({

  ownerProject: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId == Meteor.userId()) {
      console.log("ownerProject");
      return project;
    }else{
      return null;
    }
  },
  otherUser: function () {
    var project = Projects.findOne({ "_id" : FlowRouter.getParam("_id") });

    if (project.ownerId != Meteor.userId()) {
      console.log("otherUser");
      return project;
    }else{
      return null;
    }
  }
});

Template.project.events({
  'click #removeProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");

    Meteor.call( "removeProject", projectId, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Projeto removido com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #sendEtherProject'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");
    var project = Projects.findOne({ '_id' : projectId });

    var user = Meteor.users.findOne({ '_id' : Meteor.userId() });

    var value = parseFloat($('#valueTransaction').val());

    Meteor.call( "postTransaction", user.profile.walletAddress, project.walletAddress, value, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Contribuição realizada com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #sendEtherWallet'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");
    var project = Projects.findOne({ '_id' : projectId });

    var user = Meteor.users.findOne({ '_id' : Meteor.userId() });

    var value = parseFloat($('#valueTransaction').val());

    Meteor.call( "postTransaction", user.profile.walletAddress, project.walletAddress, value, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {
        Bert.alert( "Contribuição realizada com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  },
  'click #btnNewActivity'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    var projectId = FlowRouter.getParam("_id");

    var newActivity = {
      "projectId": projectId,
      "name": $('#inputNameActivity').val(),
      "value": $('#inputValueActivity').val()
    };

    Meteor.call( "insertActivity", newActivity, function( error, response ) {
      if ( error ) {
        Bert.alert( error.reason, "danger" );
      } else {

        Bert.alert( "Atividade inserida com sucesso!", "success" );
        FlowRouter.go('/painel');
      }
    });
  }
});

Template.registerHelper('projectBalance', ( walletAddress ) => {
  if ( walletAddress ) {
    console.log(walletAddress);
    var promise = Meteor.callPromise("getBalance", walletAddress, false);
  }
});
