const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/authGoogle'); 


router.post('/auth/google-login', googleLogin);

module.exports = router;
