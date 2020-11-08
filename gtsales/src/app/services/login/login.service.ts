import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  loginUsuario(usuario) {
    console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/auth`, usuario);
  }
}
