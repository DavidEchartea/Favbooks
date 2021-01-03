'use strict'
//Clase para conectarse a la base de datos!
var mongoose = require('mongoose');
var app = require('./app'); //Importamos el app.js
var port = process.env.PORT || 3800;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/appLibros';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}) //Parametros para evitar warnings en la consola.
        .then(() => {
            console.log('La conexion con MongoDB ha sido existosa!');
            app.listen(port, () => {
            console.log('El servidor esta escuchando en localhost:'+port);
            });
        })
        .catch(err => console.log(err));