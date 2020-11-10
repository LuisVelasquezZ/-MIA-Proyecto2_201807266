import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  productoForm: FormGroup;
  fecha: string = "";
  selectedFile: File;
  fileName: string = "cart.jpg";
  uniquefilename: String = "";
  constructor(private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategorias();
    this.getProductos();
    this.productoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      detalle: new FormControl('', Validators.required),
      palabras: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      idcategoria: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required)
    });
  }

  private getCategorias() {
    this.categoriaService.getCategorias().then((response: any) => {
      this.categorias = response.map((actividad) => {
        return actividad;
      });
    });
  }

  private getProductos() {
    this.productoService.getmisProductos(JSON.parse(localStorage.getItem("usuario")).idusuario).then((response: any) => {
      this.productos = response.map((producto) => {
        return producto;
      });
    });
  }

  agregarProducto() {
    const prodNuevo = {
      nombreproducto: this.productoForm.get('nombre').value,
      detalle: this.productoForm.get('detalle').value,
      palabras: this.productoForm.get('palabras').value,
      precio: this.productoForm.get('precio').value,
      idcategoria: this.productoForm.get('idcategoria').value,
      fotoproducto: this.fecha.concat(this.fileName),
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario
    }
    this.productoService.agregarProducto(prodNuevo).then(() => {
      if (this.fileName != "cart.jpg") {
        this.usuarioService.subirarchivo(this.selectedFile, this.fecha);
      }
      this.getProductos();
      this.productoForm = this.fb.group({
        nombre: new FormControl('', Validators.required),
        detalle: new FormControl('', Validators.required),
        palabras: new FormControl('', Validators.required),
        precio: new FormControl('', Validators.required),
        idcategoria: new FormControl('', Validators.required),
        foto: new FormControl('', Validators.required)
      });
      this.fecha = "";
      this.fileName= "cart.jpg";
      this.uniquefilename = "";
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    let hora = Date.now();
    this.fecha = hora.toString();
    this.uniquefilename.concat(this.fecha, this.fileName);
  }

}
