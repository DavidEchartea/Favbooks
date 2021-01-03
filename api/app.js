'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express(); //Controlador HTTP
app.use(bodyParser.urlencoded({extended:false})); //Necesario para que funcione bodyparser
app.use(bodyParser.json()); //Convertir en objetos JSON los datos que llegan por HTTP

//Cargar las rutas
var user_routes = require('./rutas/userRoute');
var favbook_routes = require('./rutas/favBooksRoute');
var pendbook_routes = require('./rutas/pendBooksRoute');

//Cabeceras HTTP
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//Rutas
app.use('/api', user_routes);
app.use('/api', favbook_routes);
app.use('/api', pendbook_routes);

//Manejo de errores
app.use((req, res, next)=>{
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;
