import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { CategoriasComponent } from './categorias/categorias.component';
import { DenunciadasComponent } from './denunciadas/denunciadas.component';
import { ReportesComponent } from './reportes/reportes.component';


export const Adminsitrador_routes : Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: '', pathMatch: 'full', redirectTo:'categorias'},
  { path: 'denunciadas', component: DenunciadasComponent },
  { path: 'reportes', component: ReportesComponent }
  
];