<<<<<<< HEAD
=======
const routes = require('express').Router();
>>>>>>> e926fc394b9c92105314d3b1e0c82fbf116ac78c




const express = require('express');
const FriendController = require('../controllers/index');
const router = express.Router();

router.get('/', FriendController.getFriend);
module.exports = router;