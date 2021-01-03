import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LibrosPendientesService } from 'src/app/services/lib-pendientes.service';
import {LibrosPend} from '../../models/lib-pendientes';
import {UserService} from 'src/app/services/user.service';
import { GLOBAL} from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lib-pendientes',
  templateUrl: './lib-pendientes.component.html',
  styleUrls: ['./lib-pendientes.component.css'],
  providers: [UserService, LibrosPendientesService]
})
export class LibPendientesComponent implements OnInit {
  public books: LibrosPend[];
  public titulo;
  public identity;
  public token;
  public url;
  public errorMessage;
  constructor(
    private _userService: UserService,
    private _libPendientes: LibrosPendientesService,
    private _router: Router
  ) {
    this.titulo = 'Libros Pendientes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    this.getLibrosPend();
  }
getLibrosPend(){
  this._libPendientes.getLibrosPend(this.token, this.identity._id).subscribe(
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
      }
  )
}

deleteBook(id){
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
      this._libPendientes.deleteFavBook(this.token, id).subscribe(response =>{
        this.getLibrosPend();
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
