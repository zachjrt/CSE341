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
  const userFirstName = req.body.firstName;
  const userLastName = req.body.lastName;
  const userEmail = req.body.email;
  const userColor = req.body.favoriteColor;
  const userBirthday = req.body.birthday;
  const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'favoriteColor':userColor, 'birthday':userBirthday};
  //Operation
  const result = await mongodb.getDb().db().collection('contacts')
                      .insertOne(userData);

  //Response
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
  //console confirmation
  console.log(`${result.modifiedCount} document(s) was/were created.`);
};

//Put Update the Friend based on ID
const updateFriend = async (req, res, next) => {
    //ID to update
    const userId = new ObjectId(req.params.id);
    //Data to update
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userColor = req.body.favoriteColor;
    const userBirthday = req.body.birthday;
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'favoriteColor':userColor, 'birthday':userBirthday};
    //operation
    const result = await mongodb.getDb().db().collection('contacts')
                        .replaceOne({ _id: userId }, userData);
    //response
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    }

  };
//Delete
const deleteFriend = async (req, res, next) => {
  //ID to delete
  //Request param switch to req.body
  const userId = new ObjectId(req.params.id);
  //Operation
  const result = await mongodb.getDb().db().collection('contacts')
                      .deleteOne({ _id: userId });
  //Response
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
  }

};

module.exports = { getFriends, getFriend, updateFriend, createFriend, deleteFriend };