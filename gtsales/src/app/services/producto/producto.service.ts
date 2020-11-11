import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReporteService } from '../reporte/reporte.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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


  getProductos(idusuario) {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getProductos/${idusuario}`);
  }

  getmisProductos(idusuario) {
    //console.log(usuario);
    return this.request('GET', `${environment.serverUrl}/getmisProductos/${idusuario}`);
  }

  agregarProducto(producto) {
    //console.log(usuario);
    this.reporteService.agregarBitacora("Agrego Producto").then(()=>{});
    return this.request('POST', `${environment.serverUrl}/agregarproducto`, producto);
  }

  getproductocategoria(producto) {
    //console.log(usuario);
    return this.request('POST', `${environment.serverUrl}/getProductoscat`, producto);
  }

  getproductoprecio(producto) {
    //console.log(producto);
    return this.request('POST', `${environment.serverUrl}/getProductospre`, producto);
  }

  agregarcarrito(producto) {
    return this.request('POST', `${environment.serverUrl}/agregarcarrito`, producto);
  }

  getcarrito(idusuario){
    return this.request('GET', `${environment.serverUrl}/getCarrito/${idusuario}`);
  }

  confirmarcarrito(idusuario){
    this.reporteService.agregarBitacora("Confirmo Carrito").then(()=>{});
    return this.request('PUT', `${environment.serverUrl}/confirmarcarrito`, idusuario);
  }

  limpiarcarrito(idusuario){
    this.reporteService.agregarBitacora("limpio Carrito").then(()=>{});
    return this.request('DELETE', `${environment.serverUrl}/limpiarcarrito/${idusuario}`);
  }

  getcarritototal(idusuario){
    return this.request('GET', `${environment.serverUrl}/getCarritototal/${idusuario}`);
  }

  getComentarios(idproducto){
    return this.request('GET', `${environment.serverUrl}/getComentarios/${idproducto}`);
  }

  agregarComentario(producto) {
    this.reporteService.agregarBitacora("Comento Producto").then(()=>{});
    return this.request('POST', `${environment.serverUrl}/agregarComentario`, producto);
  }

  bloquearProd(producto) {
    this.reporteService.agregarBitacora("Bloqueo producto").then(()=>{});
    return this.request('PUT', `${environment.serverUrl}/bloquearproducto`, producto);
  }


}
