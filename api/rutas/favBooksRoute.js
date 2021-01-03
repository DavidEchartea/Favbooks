'use strict'

var express = require('express'); //Cargamos modulo de express.

var favBookController = require('../controladores/favBookController'); //Importamos los controladores de User.

var api = express.Router(); //Objeto de express para crear rutas; POST,PUT,GET

var md_auth = require('../middlewares/authenticated');

api.get('/pruebafav',md_auth.ensureAuth, favBookController.prueba);
api.post('/add-favbook', md_auth.ensureAuth, favBookController.saveFavBook);
api.get('/get-favbooks/:user?', md_auth.ensureAuth, favBookController.getfavBooks);
api.get('/get-books/:page?', favBookController.getBooks);
api.delete('/delete-favbook/:id', md_auth.ensureAuth, favBookController.deleteBook);

module.exports = api;