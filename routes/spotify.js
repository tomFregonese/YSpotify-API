const express = require('express');
const router = express.Router();
const controller = require('../controllers/spotify');
const authenticateJwt = require('../middlewares/authenticateJwt').authenticateJwtToken;

router.get('/auth-url', authenticateJwt, controller.authUrl);
router.get('/callback', controller.callback);
//router.get('/recently-played', controller.recentlyPlayed);

module.exports = router;