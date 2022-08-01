const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/api/user-controller');
const AuthController = require('../controllers/api/auth-controller');
const upload = require('../services/uploader');
const authMiddleware = require('../middleware/is-auth-api-middleware');

router.get('/users', UserController.showUsers);
router.post('/users', authMiddleware, UserController.create);
router.put('/users/:id', authMiddleware, upload.single('image'), UserController.edit);
router.delete('/users/:id', authMiddleware, UserController.delete);

router.post('/login', AuthController.login);

module.exports = router;