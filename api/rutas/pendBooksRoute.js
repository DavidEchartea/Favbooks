'use strict'

var express = require('express'); //Cargamos modulo de express.

var pendBookController = require('../controladores/pendBookController'); //Importamos los controladores de User.

var api = express.Router(); //Objeto de express para crear rutas; POST,PUT,GET

var md_auth = require('../middlewares/authenticated');

api.get('/prueba', pendBookController.prueba);
api.post('/add-pendbook', pendBookController.savePendBook);
api.get('/get-pendbooks/:user?',pendBookController.getPendBooks);
api.delete('/delete-pendbook/:id', pendBookController.deletePendBook);

module.exports = api;