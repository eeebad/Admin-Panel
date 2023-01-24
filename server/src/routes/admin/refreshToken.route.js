const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/admin/refreshToken.controller');

router.get('/', Controller.handleRefreshToken);

module.exports = router;