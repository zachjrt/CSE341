const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get all
const getFriends = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

//GET one based on id
const getFriend = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

//Post
const createFriend = async (req, res, next) => {
  //Data to be added
  const userFirstName = req.params.first;
  const userLastName = req.params.last;
  const userEmail = req.params.email;
  const userColor = req.params.color;
  const userBirthday = req.params.birth;
  const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'favoriteColor':userColor, 'birthday':userBirthday};
  //Operation
  const result = await mongodb.getDb().db().collection('contacts')
                      .insertOne(userData);

  //Response

  //console confirmation
  console.log(`${result.modifiedCount} document(s) was/were created.`);
};

//Put Update the Friend based on ID
const updateFriend = async (req, res, next) => {
    //ID to update
    const userId = new ObjectId(req.params.id);
    //Data to update
    const userFirstName = req.params.first;
    const userLastName = req.params.last;
    const userEmail = req.params.email;
    const userColor = req.params.color;
    const userBirthday = req.params.birth;
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'favoriteColor':userColor, 'birthday':userBirthday};
    //operation
    const result = await mongodb.getDb().db().collection('contacts')
                        .updateOne({ _id: userId }, {$set: userData});
    //response
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
};
//Delete
const deleteFriend = async (req, res, next) => {
  //ID to delete
  const userId = new ObjectId(req.params.id);
  //Operation
  const result = await mongodb.getDb().db().collection('contacts')
                      .deleteOne({ _id: userId });
  //Response
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
};

module.exports = { getFriends, getFriend, updateFriend, createFriend, deleteFriend };