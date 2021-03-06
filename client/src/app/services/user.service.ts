import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {GLOBAL} from './global';
@Injectable() //Inyeccion de datos a otras dependencias
export class UserService{
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }

    signup(user_to_login, gethash = null): Observable <any>{
        //console.log('Hola desde el servicio de login');
        if(gethash != null){
            user_to_login.gethash = gethash;
        }

        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login', params, {headers : headers});
    }

    register(user_to_register): Observable <any>{
        let json = JSON.stringify(user_to_register);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'registerUser', params, {headers : headers});
    }

    getIdentity(){
        //Convertir un String guardado en localStorage a obj JSON
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
    updateUser(user_to_update): Observable <any>{
        let json = JSON.stringify(user_to_update);
        let params = json;

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
        return this._http.put(this.url + 'update-user/' + user_to_update._id , params, {headers : headers});
    
    }
}
