const express = require("express");
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpecFile = require('../swagger/swagger_output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpecFile));

module.exports = router;