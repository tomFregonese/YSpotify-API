const express = require("express");
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecFile = require('../swagger/swagger_output.json');

router.use('/api-doc', swaggerUi.serve);
router.get('/api-doc', swaggerUi.setup(swaggerSpecFile));

module.exports = router;