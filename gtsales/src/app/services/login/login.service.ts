import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  environment } from '../../../environments/environment';
import { from } from 'rxjs';
import { ReporteService } from '../reporte/reporte.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private reporteService:ReporteService) { }

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
    //console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/auth`, usuario);
  }

  emailUsuario(usuario) {
    //console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/email`, usuario);
  }

  recuperarUsuario(usuario) {
    //console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/recuperar`, usuario);
  }

  passusuario(usuario){
    return this.request('PUT', `${environment.serverUrl}/passusuario`, usuario);
  }


  agregarDenuncia(usuario) {
    //console.log(usuario);
    this.reporteService.agregarBitacora("Denunica Producto").then(()=>{});
    return this.request('POST', `${environment.serverUrl}/agregarDenuncia`, usuario);
  }

  getDenuncias() {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getDenuncias`);
  }

  editardenuncia(denuncia) {
    //console.log(usuario);
    return this.request('PUT', `${environment.serverUrl}/editardenuncia`, denuncia);
  }
}
