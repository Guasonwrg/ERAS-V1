const express = require('express');
const userController = require('../controllers/userControllers');
const authGoogle = require('../controllers/authGoogle')
const router = express.Router();

router.post('/ingresar', userController.loginUser);
router.post('/agregar', userController.createUser);
router.post('/google-login', authGoogle.googleLogin);
router.get('/', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/editar/:id', userController.updateUser);
router.put('/perfil/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUser);

module.exports = router;
