// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAdmin } = require('../middleware/admin');

router.get('/users', isAdmin, userController.getUsers);
router.post('/users/delete/:id', isAdmin, userController.deleteUser);
router.post('/users/upgrade/:id', isAdmin, userController.upgradeUser);

module.exports = router;