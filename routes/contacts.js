
const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();

router.get('/', contactsController.getFriends);

router.get('/:id', contactsController.getFriend);

module.exports = router;