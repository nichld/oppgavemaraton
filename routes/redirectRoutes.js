const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirectController');

router.get('/helloworld', redirectController.redirectToNginx);

module.exports = router;