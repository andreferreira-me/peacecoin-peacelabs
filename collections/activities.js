Activities = new Mongo.Collection( 'activities' );

Activities.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Activities.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ActivitySchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description"
  },
  "image": {
    type: String,
    label: "Project Image"
  },
  "isActive": {
    type: Boolean,
    label: "Project isActive?"
  },
  "walletAddress": {
    type: String,
    label: "Project Wallet Address"
  }
});

Activities.attachSchema( ActivitySchema );
