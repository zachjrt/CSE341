
const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

router.get('/', contactsController.getFriends);

router.get('/:id', contactsController.getFriend);

router.get('/update/:id/:first/:last/:email/:color/:birth', contactsController.updateFriend);

router.get('/create/:first/:last/:email/:color/:birth', contactsController.createFriend);

router.get('/delete/:id', contactsController.deleteFriend);

module.exports = router;