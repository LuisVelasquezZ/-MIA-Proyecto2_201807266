import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

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


  getBitacora() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getBitacora/`);
  }

  agregarBitacora(accion){
    const bitacora = {
      idusuario : JSON.parse(localStorage.getItem("usuario")).idusuario,
      contenido:accion
    }
    return this.request('POST', `${environment.serverUrl}/agregarBitacora/`, bitacora);
  }

  getrep1() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep1/`);
  }

  getrep4a() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep4a/`);
  }

  getrep4b() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep4b/`);
  }

  getrep5() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep5/`);
  }

  getrep6() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep6/`);
  }

  getrep7() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getrep7/`);
  }
}
