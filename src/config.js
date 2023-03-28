module.exports = {
  tasks: {
    location: "australia-southeast1",
    queueName: "default",
  },
  bigQuery: {
    location: "australia-southeast1",
    datasetName: "hello_appengine",
    tableName: "requests",
  },
  firestore: {
    collectionPath: "requests",
  },
};
