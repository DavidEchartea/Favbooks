import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { LibrosFavoritosService } from 'src/app/services/lib-favoritos.service';
import {LibrosFav} from '../../models/lib-favoritos';
import { report } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, LibrosFavoritosService]
})
export class HomeComponent implements OnInit {
  public books: LibrosFav[];
  public identity;
  public token;
  public url;
  public errorMessage;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _libFavService: LibrosFavoritosService,
    private _userService: UserService,
    private _router: Router,
  ){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(){
    this.getLibros();
    console.log(this.token);
  }
  getLibros(){
    this._libFavService.getLibros().subscribe(
      response =>{
        if(!response.books){
          this.alertMessage = 'No hay libros aun';
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

}
