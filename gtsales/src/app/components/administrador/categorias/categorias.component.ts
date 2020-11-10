import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { FormGroup, FormBuilder, Validators,  FormControl } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias:any[] = [];
  actividadForm: FormGroup;

  constructor(private categoriaService:CategoriaService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getCategorias();
    this.actividadForm = this.fb.group({
      nombre: new FormControl('', Validators.required)
    });
  }

  private getCategorias() {
    this.categoriaService.getCategorias().then((response:any) => {
      this.categorias = response.map((actividad) =>{
        return actividad;
      });
    });
  }

  agregarCategoria(){
    const categoriaNuevo = {
      nombrecategoria: this.actividadForm.get('nombre').value
    }
    this.categoriaService.agregarCategoria(categoriaNuevo).then(() =>{
      this.getCategorias();
      this.actividadForm = this.fb.group({
        nombre: new FormControl('', Validators.required)
      });
    })
  }
}
