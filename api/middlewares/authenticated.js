'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso'
//Metodo de autentificacion para los usuarios
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');//Reemplazamos las comillas que pudieran venir en el string del token
    
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'El token no es valido'});
    }
    req.user = payload;
    next();
};