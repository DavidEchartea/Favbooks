'use strict'
var bcryp = require('bcrypt-nodejs'); //encryptar contrase;as
var PendBook = require('../modelos/pendbooks'); // Importamos el modelo User
const user = require('../modelos/user');
var jwt = require('../servicio/jwt'); //Importamos el servicio de JWT para crear tokens


function prueba(req, res){
    res.status(200).send({message: 'Ruta de prueba para pendBooks'});
}

function savePendBook(req, res){
    var pendBook = new PendBook();
    var params = req.body;

    pendBook.title = params.title;
    pendBook.author = params.author;
    pendBook.description = params.description;
    pendBook.year = params.year;
    pendBook.image = params.image;
    pendBook.info = params.info;
    pendBook.user = params.user;

    pendBook.save((err, pendBookStored)=>{
        if(err){
            res.status(500).send({message: "Error al guardar el libro"});
        }else{
            if(!pendBookStored){
                res.status(404).send({message: "El libro no se ha guardado"});
            }else{
                res.status(200).send({pendBook: pendBookStored});
            }
        }
    });
}

function getPendBooks(req, res){
    var userId = req.params.user;

    if(!userId){
        var find = PendBook.find({}).sort('title');
    }else{
        var find = PendBook.find({user : userId}).sort('title');
    }
    find.populate({path: 'user'}).exec((err, books)=>{
        if(err){
            res.status(500).send({message: "Error en la peticion"});
        }else{
            if(!books){
                res.status(404).send({message: "No hay libros"});
            }else{
                res.status(200).send({books});
            }
        }
    });
}
function deletePendBook(req, res){
    var bookId = req.params.id;

    PendBook.findByIdAndRemove(bookId, (err, bookRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar el libro'});
        }else{
            if(!bookRemoved){
                res.status(404).send({message: 'El libro no ha sido eliminado'});
            }else{
                res.status(200).send({book: bookRemoved});
            }
        }
    });
}

module.exports = {
    prueba,
    savePendBook,
    getPendBooks,
    deletePendBook
}