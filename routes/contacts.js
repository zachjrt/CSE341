
const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

router.get('/', contactsController.getFriends);

router.get('/:id', contactsController.getFriend);

router.put('/:id', contactsController.updateFriend);

router.post('/', contactsController.createFriend);

router.delete('/:id', contactsController.deleteFriend);

module.exports = router;