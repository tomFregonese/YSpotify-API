const express = require("express");
const router = express.Router();
const controller = require("../controllers/groups");
const authenticateJwt = require('../middlewares/authenticateJwt').authenticateJwtToken;

router.post('/join-group', authenticateJwt, controller.joinGroup);

module.exports = router;
