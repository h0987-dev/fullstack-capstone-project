const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
let database;

async function connectToDatabase() {
  if (!database) {
    await client.connect();
    database = client.db(process.env.MONGODB_DB || 'giftlink');
  }
  return database;
}

module.exports = { client, connectToDatabase };
