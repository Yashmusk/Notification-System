const express = require('express');
const router = express.Router();
console.log("Auth routes loaded");
const {
  signup,
  login
} = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;