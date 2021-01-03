import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {LibrosFav} from 'src/app/models/lib-favoritos';
@Injectable() //Inyeccion de datos a otras dependencias
export class LibrosFavoritosService{
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    getLibrosFav(token, id:string): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
        
      return this._http.get(this.url + 'get-favbooks/'+ id, {headers : headers}); 
    }
    getLibros(): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
      return this._http.get(this.url + 'get-books/', {headers : headers})
    }

    addFavBook(token, favbook: LibrosFav): Observable <any>{
      let params = JSON.stringify(favbook);

      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);

        return this._http.post(this.url + 'add-favbook', params, {headers : headers});
    }

    deleteFavBook(token, id): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
      
      return this._http.delete(this.url + 'delete-favbook/' + id, {headers: headers});
    }
  }