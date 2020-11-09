import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

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

  getUsuarios() {
    return this.request('GET', `${environment.serverUrl}/getusuarios`);
  }

  getUsuario(idUsuario) {
    return this.request('GET', `${environment.serverUrl}/getusuario/${idUsuario}`);
  }

  crearUsuario(usuario) {
    return this.request('POST', `${environment.serverUrl}/agregarusuario`, usuario);
  }

  actualizarUsuario(usuario) {
    console.log(usuario);
    return this.request('PUT', `${environment.serverUrl}/actualizarusuario`, usuario);
  }

  confirmarUsuario(usuario) {
    return this.request('PUT', `${environment.serverUrl}/actualizarusuario`, usuario);
  }
  eliminarUsuario(idUsuario) {
    return this.request('DELETE', `${environment.serverUrl}/eliminarusuario/${idUsuario}`);
  }


  subirarchivo(selectedFile, hora) {
    const uploadData = new FormData();
    //hora :Date;
    uploadData.append('photo', selectedFile, hora+selectedFile.name);
    this.http.post(`${environment.serverUrl}/foto`, uploadData).subscribe((response) => {
      console.log(response); // handle event here
    });
  }
}
