import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LibrosFavoritosService } from 'src/app/services/lib-favoritos.service';
import {LibrosFav} from '../../models/lib-favoritos';
import {UserService} from 'src/app/services/user.service';
import { GLOBAL} from 'src/app/services/global';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lib-favoritos',
  templateUrl: './lib-favoritos.component.html',
  styleUrls: ['./lib-favoritos.component.css'],
  providers: [UserService, LibrosFavoritosService]
})
export class LibFavoritosComponent implements OnInit {
public books: LibrosFav[];
public titulo;
public identity;
public token;
public url;
public errorMessage;

  constructor(
    private _libFavService: LibrosFavoritosService,
    private _userService: UserService,
    private _router: Router
    ){
    this.titulo = 'Libros Favoritos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.getLibrosFav();
  }

  getLibrosFav(){
    this._libFavService.getLibrosFav(this.token, this.identity._id).subscribe(
      response => {
          if(!response.books){
              this._router.navigate(['/']);
          }else{
              this.books = response.books;
          }
      },
      error =>{
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
              var parsedError = error.error.message;
              console.log(parsedError);
              this.errorMessage = parsedError;
          }
          });
  }

  deleteFavBook(id)
  {
    Swal.fire({
      title: 'Seguro que quieres eliminar el libro?',
      text: "Si lo eliminas, tendras que agregarlo nuevamente.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._libFavService.deleteFavBook(this.token, id).subscribe(response =>{
          this.getLibrosFav();
          Swal.fire(
            'Eliminado!',
            'Eliminado Correctamente!',
            'success'
          )
        },
        error =>{
          Swal.fire({
            icon: 'error',
            title: 'Oops... Algo salio mal',
            text: 'No se pudo agregar el libro, intenta de nuevo!'
          });
        })
      }
    })
  } 






}
