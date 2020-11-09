import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { PerfilComponent } from './perfil/perfil.component';


export const Usuario_routes : Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: '', pathMatch: 'full', redirectTo:'perfil'}
];