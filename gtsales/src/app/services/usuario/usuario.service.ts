import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReporteService } from '../reporte/reporte.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private reporteService:ReporteService) { }

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
    this.reporteService.agregarBitacora("Realizo cambios").then(()=>{});
    return this.request('PUT', `${environment.serverUrl}/actualizarusuario`, usuario);
  }
  pagarUsuario(usuario) {
    return this.request('PUT', `${environment.serverUrl}/pagousuario`, usuario);
  }

  cobrarUsuario(usuario) {
    return this.request('PUT', `${environment.serverUrl}/cobrousuario`, usuario);
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
    // handle event here
    });
  }
}
