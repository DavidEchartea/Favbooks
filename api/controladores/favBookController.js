'use strict'
var bcryp = require('bcrypt-nodejs'); //encryptar contrase;as
var FavBook = require('../modelos/favbooks'); // Importamos el modelo User
var jwt = require('../servicio/jwt'); //Importamos el servicio de JWT para crear tokens
var mongoosePaginate = require('mongoose-pagination');
const favBook = require('../modelos/favbooks'); // Importamos el modelo User
const favbooks = require('../modelos/favbooks');

function prueba(req, res){
    res.status(200).send({message: 'Ruta de prueba para favBooks'});
}

function saveFavBook(req, res){
    var favBook = new FavBook(); //Creamos un objeto favBook
    var params = req.body; //Recojemos los datos que nos llegan por la peticion POST
    //Asignamos los datos que nos llegan por el POST a los campos del objeto favBook para despues guardarlos en BD
    favBook.title = params.title;
    favBook.author = params.author;
    favBook.description = params.description;
    favBook.year = params.year;
    favBook.user = params.user;
    favBook.image = params.image;
    favBook.info = params.info;
    //Guardamos el objecto en BD con el metodo save
    favBook.save((err, favBookStored)=>{
        if(err){
            res.status(500).send({message: "Error al guardar el libro favorito"});
        }else{
            if(!favBookStored){
                res.status(404).send({message: "El libro no se ha guardado"});
            }else{
                res.status(200).send({favBook: favBookStored});
            }
        }
    });
}

function getfavBooks(req, res){
    var userId = req.params.user;

    if(!userId){
        var find = FavBook.find({}).sort('author');
    }else{
        var find = FavBook.find({user: userId}).sort('author');
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
function getBooks(req, res){
    if(req.params.page){
        var page = req.params.page;
        }else{
            var page = 1;
        }
        var itemsperPage = 4;
        FavBook.find().sort('author').paginate(page, itemsperPage, function(err, books, total){
            if(err){
                res.status(500).send({message: 'Error en la peticion'});
            }else{
                if(!books){
                    res.status(404).send({message: 'No hay artistas'});
                }else{
                    return res.status(200).send({
                        total_items: total,
                        books: books
                    });
                }
            }
        });
}

function deleteBook(req, res){
    var bookId = req.params.id;

    FavBook.findByIdAndRemove(bookId, (err, bookRemoved)=>{
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
    saveFavBook,
    getfavBooks,
    deleteBook,
    getBooks
}