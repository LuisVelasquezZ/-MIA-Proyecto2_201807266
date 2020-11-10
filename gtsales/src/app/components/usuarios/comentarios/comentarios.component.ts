import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  productos: any[] = [];
  creditos: any[] = [];
  total: any[] = [];
  correovendedor: any[] = [];
  produc = {
    fotoproducto: '',
    nombreproducto: '',
    detalle: '',
    precio: '',
    nombrecategoria: '',
    palabras: ''
  }
  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder, private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {

    this.getProductos();
  }

  private getProductos() {
    this.productoService.getcarrito(JSON.parse(localStorage.getItem("usuario")).idusuario).then((response: any) => {
      this.productos = response.map((producto) => {
        return producto;
      });
    });
  }

  verdetalles(prod: any) {
    this.produc = prod;
  }

  pago(prod) {

  }


  confirmarcarrito() {
    const usr = JSON.parse(localStorage.getItem("usuario")).idusuario;
    const usrc = JSON.parse(localStorage.getItem("usuario")).correo;
    let textenv = "Productos comprados:\n";
    const car = {
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario
    }
    this.productoService.getcarritototal(usr).then((response: any) => {
      this.total = response.map((producto) => {
        return producto;
      });

      this.usuarioService.getUsuario(usr).then((response: any) => {
        this.creditos = response.map((p) => {
          return p;
        });
        if (this.total[0].total <= this.creditos[0].creditos) {
          this.productos.forEach((prod) => {
            const pago = {
              creditos: prod.precio,
              idusuario: prod.idusuario
            }
            this.usuarioService.pagarUsuario(pago).then(() => {
              this.usuarioService.getUsuario(prod.idusuario).then((response: any) => {
                this.correovendedor = response.map((vend) => {
                  return vend;
                });
                const email = {
                  para: this.correovendedor[0].correo,
                  texto: usrc + ' realizó una compra del producto ' + prod.nombreproducto
                }
                this.loginService.emailUsuario(email).then(() => { });
              });
            });
          });
          const pago = {
            creditos: this.total[0].total,
            idusuario: usr
          }
          this.usuarioService.cobrarUsuario(pago).then(() => { });
          this.productoService.confirmarcarrito(car).then(() => {
            this.productos.forEach(element => {
                textenv += element.nombreproducto + '   ' + element.precio + '\n'
            });
            textenv += 'Total: ' +this.total[0].total
            const email = {
              para: usrc,
              texto: textenv
            }
            this.loginService.emailUsuario(email).then(() => { });
            alert('pago realizado');
            this.router.navigate(['/usuarios/comprar']);
          });

        } else {
          alert("Creditos insuficientes");
        }
      })
    });
  }

  limpiarcarrito() {
    this.productoService.limpiarcarrito(JSON.parse(localStorage.getItem("usuario")).idusuario).then(() => {
      this.getProductos();
    })
  }
}

