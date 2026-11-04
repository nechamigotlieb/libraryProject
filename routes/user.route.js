const express = require('express');
const router = express.Router();
const { signUp, signIn, getAllUsers } = require('../controllers/user.controller');

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.get('/', getAllUsers);

module.exports = router;