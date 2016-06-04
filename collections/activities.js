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

Activities.Statuses = SEnum([
  { value: 0, label: "Aberta"},
  { value: 1, label: "Pendente"},
  { value: 2, label: "Concluida"},
]);

ActivitySchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Activity Name"
  },
  "value": {
    type: String,
    label: "Activity Value"
  },
  "projectId": {
    type: String,
    label: "Project Id"
  },
  "collaboratorId": {
    type: String,
    label: "Collaborator Id",
    optional: true
  },
  "status": {
    type: String,
    label: "Activity Status",
    optional: true,
    allowedValues: Activities.Statuses.values().concat(Activities.Statuses.keys())
  }
});

Activities.attachSchema( ActivitySchema );
