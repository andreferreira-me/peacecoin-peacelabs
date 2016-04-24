Projects = new Mongo.Collection( 'projects' );

Projects.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Projects.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ProjectSchema = new SimpleSchema({
  "ownerId": {
    type: String,
    label: " Owner"
  },
  "name": {
    type: String,
    label: "Project Name"
  },
  "description": {
    type: String,
    label: "Project Description"
  },
  "activities": {
    type: String,
    label: "Project Actvities",
    optional: true
  },
  "image": {
    type: String,
    label: "Project Image"
  },
  "status": {
    type: String,
    label: "Project Status"
  },
  "walletAddress": {
    type: String,
    label: "Project Wallet Address"
  },
  "balance": {
    type: Number,
    label: "Project Wallet Balance"
  }
});

Projects.attachSchema( ProjectSchema );
