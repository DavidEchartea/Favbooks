import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
const urlBase = 'https://www.googleapis.com/books/v1/volumes?q=';
const maxRes = '&maxResults='

const key = "AIzaSyDDAGFXy5XaP0wAIVTFqFGJFuj8TJa6RqQ";
@Injectable({
  providedIn: "root"
})
export class GoogleapiService {
  
  constructor(private httpClient: HttpClient) {}

  getbooks(search: string){
    const url = urlBase + search + maxRes + 40;
    return this.httpClient.get(url);
  }
}
