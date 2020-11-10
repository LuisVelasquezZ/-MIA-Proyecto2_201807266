import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-compar',
  templateUrl: './compar.component.html',
  styleUrls: ['./compar.component.css']
})
export class ComparComponent implements OnInit {
  categorias:any[] = [];
  productos:any[] = [];
  comentarios:any[] = [];
  compForm: FormGroup;
  comentarioForm: FormGroup;
  filtro = true;
  produc = {
    fotoproducto:'',
    nombreproducto:'',
    detalle:'',
    precio:'',
    nombrecategoria:'',
    palabras:'',
    idproducto:''
  }
  constructor(private categoriaService:CategoriaService,
    private productoService:ProductoService,
    private usuarioService:UsuarioService, 
    private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
    this.compForm = this.fb.group({
      idcategoria: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required)
    });

    this.comentarioForm = this.fb.group({
      contenido: new FormControl('', Validators.required)
    });
  }

  private getCategorias() {
    this.categoriaService.getCategorias().then((response:any) => {
      this.categorias = response.map((actividad) =>{
        return actividad;
      });
    });
  }

  private getProductos() {
    this.productoService.getProductos(JSON.parse(localStorage.getItem("usuario")).idusuario).then((response:any) => {
      this.productos = response.map((producto) =>{
        return producto;
      });
    });
  }

  private getComentarios(idproducto) {
    this.productoService.getComentarios(idproducto).then((response:any) => {
      this.comentarios = response.map((producto) =>{
        return producto;
      });
    });
  }

  quitarfiltro(){
    this.filtro = true;
    this.getCategorias();
    this.getProductos();
    this.compForm = this.fb.group({
      idcategoria: new FormControl('', Validators.required),
      orden: new FormControl('', Validators.required)
    });
  }


  filtrar() {
    this.filtro = false;
    const prodNuevo = {
      orden: this.compForm.get('orden').value,
      idcategoria: this.compForm.get('idcategoria').value,
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario
    }
    if(this.compForm.get('idcategoria').value !=  '') {
      this.productoService.getproductocategoria(prodNuevo).then((response:any) => {
        this.productos = response.map((producto) =>{
          return producto;
        });
      });
    } else if(this.compForm.get('orden').value !=  '') {
      this.productoService.getproductoprecio(prodNuevo).then((response:any) => {
        this.productos = response.map((producto) =>{
          return producto;
        });
      });
    }
  }

  agregarcarrito(prod:any){
    const carriton = {
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario,
      idproducto: prod.idproducto
    }
    this.productoService.agregarcarrito(carriton).then((response:any) =>{
      this.router.navigate(['/usuarios/carrito']);
    });
  }

  verdetalles(prod:any){
    this.produc =  prod;
    this.getComentarios(prod.idproducto);
  }

  agregarComentario(idproducto){
    const comentarioNuevo = {
      idproducto: idproducto,
      contenido: this.comentarioForm.get('contenido').value,
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario
    }
    this.productoService.agregarComentario(comentarioNuevo).then(() =>{
      console.log(comentarioNuevo);
      this.getComentarios(idproducto);
      this.comentarioForm = this.fb.group({
        contenido: new FormControl('', Validators.required)
      });
    })
  }
}
