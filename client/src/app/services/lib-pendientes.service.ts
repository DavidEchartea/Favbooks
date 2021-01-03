import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
import {LibrosPend} from 'src/app/models/lib-pendientes';
@Injectable() //Inyeccion de datos a otras dependencias
export class LibrosPendientesService{
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    getLibrosPend(token, id:string): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
        
      return this._http.get(this.url + 'get-pendbooks/'+ id, {headers : headers}); 
    }

    addLibroPend(token, libpend: LibrosPend): Observable <any>{
      let params = JSON.stringify(libpend);

      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);

        return this._http.post(this.url + 'add-pendbook', params, {headers : headers});
    }

    deleteFavBook(token, id): Observable <any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', token);
      
      return this._http.delete(this.url + 'delete-pendbook/' + id, {headers: headers});
    }
}