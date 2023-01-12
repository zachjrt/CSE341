
const express = require('express');
const FriendController = require('../controllers/index');
const router = express.Router();

router.get('/', FriendController.getFriend);
module.exports = router;