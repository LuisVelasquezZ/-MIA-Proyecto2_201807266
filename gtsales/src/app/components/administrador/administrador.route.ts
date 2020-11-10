import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { CategoriasComponent } from './categorias/categorias.component';


export const Adminsitrador_routes : Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: '', pathMatch: 'full', redirectTo:'categorias'}
];