'use strict'

var express = require('express'); //Cargamos modulo de express.

var UserController = require('../controladores/userController'); //Importamos los controladores de User.

var api = express.Router(); //Objeto de express para crear rutas; POST,PUT,GET

var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty'); //Para subir ficheros

var md_upload = multipart({uploadDir: './uploads/users'});

api.get('/rutadePrueba',md_auth.ensureAuth, UserController.prueba);
api.post('/registerUser', UserController.register);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-user-image/:imageFile', UserController.getImageFile);

module.exports = api;