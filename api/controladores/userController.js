'use strict'
var bcryp = require('bcrypt-nodejs'); //encryptar contrase;as
var User = require('../modelos/user'); // Importamos el modelo User
var jwt = require('../servicio/jwt'); //Importamos el servicio de JWT para crear tokens
var  fs = require('fs');
var path = require('path');
const params  = require('../rutas/userRoute');

function prueba(req, res){
    res.status(200).send({message: 'Ruta de prueba para usuarios'});
}

//Creamos un metodo para el registro de usuarios
function register(req, res){
    var user = new User(); //Objeto del esquema User

    var params = req.body; //Recogemos los datos que nos lleguen por POST

    //Asignamos los datos que nos llegan por metodo Post
    //a las variables del esquema USER para posteriormente guardarlas en BD.
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';
    
    //Si la contrase;a existe, la encriptara
    if(params.password){
        //Encriptar contrase;a
        bcryp.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //guardar usuario en la BD
                user.save((err, userStored)=> {
                    if(err){
                        res.status(500).send({message: "Error al guardar el usuario"});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: "No se ha registrado el usuario"});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                })
            }else{
                res.status(200).send({message: "Rellena todos los campos"});
            }
        });
    }else{
        res.status(200).send({message: "Introduce la contrase;a"});
    }
}
//Metodo para verificar que el usuario y password existan en la BD para hacer el login
function loginUser(req, res){
    var params = req.body; //Recogemos los datos que nos llegan por POST
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({ message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({ message: 'Usuario no existe'});
            }else{
                //Comprobar password
                bcryp.compare(password, user.password, function(err, check){
                    if(check){
                        //Devolver los datos del usuario logeado
                        if(params.gethash){
                            //Devolver un token de JWT
                            res.status(200).send({
                                token: jwt.createToken(user) 
                            })
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({ message: 'El usuario no ha podido logearse'});
                    }
                })
            }
        }
    });
}
//Metodo para modificar los datos del usuario
function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        return res.status(500).send({ message: 'No tienes permiso para actualizar el usuario'});
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({ message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({ message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}
//Metodo para subir una imagen
function uploadImage(req, res){
    var userId  = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if(!userUpdated){
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({image: file_name, user: userUpdated});
                }
            })
        }else{
            res.status(404).send({ message: 'La extension del archivo no valida'});
        }
    }else{
        res.status(404).send({ message: 'No se ha subido ninguna imagen'});
    }
}

//Metodo para obtener las imagenes del usario del servidor
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+imageFile
    fs.exists('./uploads/users/'+imageFile, function(exists){
        if(exists){
            res.sendFile(path.resolve('./uploads/users/'+imageFile));
        }else{
            res.status(200).send({ message: 'No existe la imagen'});
        }
    });

}

module.exports = {
    prueba,
    register,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}
