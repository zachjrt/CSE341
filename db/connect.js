require('dotenv').config()
//console.log(process.env)

const MongoClient = require('mongodb').MongoClient;

//pre .env switch out  MongoClient.connect(process.env.MONGO_URI) to use
// const mongoURL='mongodb+srv://admin:SuperU$er!@cluster0.wj3jenx.mongodb.net/test'


let _db;

//Referenced 
const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGO_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};