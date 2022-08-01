const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/auth-controller');
const PageController = require('../controllers/page-controller');
const upload = require('../services/uploader');

//home
router.get('/', PageController.showHome);
//register
router.get('/zarejestruj', AuthController.showRegister);
router.post('/zarejestruj', AuthController.register);
//login
router.get('/zaloguj', AuthController.showLogin);
router.post('/zaloguj', AuthController.login);
//profil
router.get('/admin/profil', AuthController.showProfile);
router.post('/admin/profil', AuthController.update);
//logout
router.get('/wyloguj', AuthController.logout);
//users
router.get('/uzytkownicy', UserController.showUsers);
router.get('/uzytkownicy/:id/:mode?', UserController.showUser);
//add
router.get('/admin/uzytkownik/dodaj', UserController.showCreateUser);
router.post('/admin/uzytkownik/dodaj', UserController.createUser);
//edit
router.get('/admin/uzytkownicy/:id/edytuj', UserController.showEditUser);
router.post('/admin/uzytkownicy/:id/edytuj', upload.single('image'), UserController.editUser);
//delete
router.get('/admin/uzytkownicy/:id/usun', UserController.deleteUser);
//delete-image
router.get('/admin/uzytkownicy/:id/usun-zdjecie', UserController.deleteImage);
//csv
router.get('/csv', UserController.getCsv);
//error
router.get('*', PageController.showNotFound);

module.exports = router;