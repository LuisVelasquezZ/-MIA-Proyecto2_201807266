import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http:HttpClient) { }

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {}
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    }); 
  }


  getCategorias() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getcategorias`);
  }

  agregarCategoria(catetoria) {
    //console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/agregarcategoria`, catetoria);
  }
}
