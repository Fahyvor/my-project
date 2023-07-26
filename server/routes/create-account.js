const express = require('express');
const router = express.Router();

const { createAccount } = require('../controllers/create-account');

router.post('/create', createAccount);

module.exports = router