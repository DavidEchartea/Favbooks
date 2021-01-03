import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleapiService } from 'src/app/services/googleapi.service';
import { UserService } from 'src/app/services/user.service';
import {LibrosFav} from 'src/app/models/lib-favoritos';
import { LibrosFavoritosService } from 'src/app/services/lib-favoritos.service';
import { LibrosPendientesService } from 'src/app/services/lib-pendientes.service';
import { LibrosPend } from 'src/app/models/lib-pendientes';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [UserService, LibrosFavoritosService, LibrosPendientesService]
})

export class SearchComponent implements OnInit {
  formulario: FormGroup;
  libros: any;
  public identity;
  public token;
  public librofav : LibrosFav;
  public libropend: LibrosPend;
  public imgNotFound = '../../assets/img/not-found.jpg';
  constructor(
    private _api: GoogleapiService,
    private fb: FormBuilder,
    private _userService : UserService,
    private _favbookService: LibrosFavoritosService,
    private _pendbookService: LibrosPendientesService
    ){
      this.inciarFormulario();
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.librofav = new LibrosFav('',[],'','','','','');
      this.libropend = new LibrosPend('',[],'','','','','');
      
    }
  ngOnInit(){
  }
  inciarFormulario(){
    this.formulario = this.fb.group({
      libro: ['Stephen King', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }
  searchBooks(){
    this._api.getbooks(this.formulario.get('libro').value).subscribe(response => {
      this.libros = response;
    });
  }
  addFavBook(libro: any){
    //console.log(libro);
    this.librofav.title = libro.volumeInfo.title;
    this.librofav.author = libro.volumeInfo.authors;
    if(libro.searchInfo === undefined){
      console.log('descripcion no disponible')
      this.librofav.description = 'Descripcion no disponible'
    }else{
      this.librofav.description = libro.searchInfo.textSnippet;
    }
    
    this.librofav.year = libro.volumeInfo.publishedDate;
    this.librofav.user = this.identity._id;
    if(libro.volumeInfo.imageLinks === undefined){
      console.log('imagen no encontrada');
      this.librofav.image = this.imgNotFound;
    }else{
      this.librofav.image = libro.volumeInfo.imageLinks.smallThumbnail;
    }
    this.librofav.info = libro.volumeInfo.infoLink;
    //console.log(this.librofav);

    this._favbookService.addFavBook(this.token, this.librofav).subscribe(
      response => {
        //Objeto que nos devuelve la BD que vamos a tener disponible
        this.librofav = response.librofav
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Listo',
          text: 'Libro favorito agregado correctamente!',
          showConfirmButton: false,
          timer: 2000
        })
        this.librofav = new LibrosFav('',[],'','','','','');
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops... Algo salio mal',
          text: 'No se pudo agregar el libro, intenta de nuevo!'
        })
        });
  }

  addPendBook(libro: any){
    //console.log(libro);
    this.libropend.title = libro.volumeInfo.title;
    this.libropend.author = libro.volumeInfo.authors;
    if(libro.searchInfo === undefined){
      console.log('descripcion no disponible')
      this.libropend.description = 'Descripcion no disponible'
    }else{
      this.libropend.description = libro.searchInfo.textSnippet;
    }
    this.libropend.year = libro.volumeInfo.publishedDate;
    this.libropend.user = this.identity._id;
    if(libro.volumeInfo.imageLinks === undefined){
      console.log('imagen no encontrada');
      this.libropend.image = this.imgNotFound;
    }else{
      this.libropend.image = libro.volumeInfo.imageLinks.smallThumbnail;
    }
    this.libropend.info = libro.volumeInfo.infoLink;
    //console.log(this.libropend);
    this._pendbookService.addLibroPend(this.token, this.libropend).subscribe(
      response =>{
          this.libropend = response.libropend;
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Listo',
            text: 'Libro pendiente agregado correctamente!',
            showConfirmButton: false,
            timer: 2000
          })
      this.libropend = new LibrosPend('',[],'','','','','');
    },
    error =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops... Algo salio mal',
        text: 'No se pudo agregar el libro, intenta de nuevo!'
      });
      });
  }
}

