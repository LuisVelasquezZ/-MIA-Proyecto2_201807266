import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { Adminsitrador_routes } from './components/administrador/administrador.route';
import { LoginComponent } from './components/login/login.component';
import { RecuperarComponent } from './components/login/recuperar/recuperar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { Usuario_routes } from './components/usuarios/usuarios.route';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo:'login'},
  { path: 'registro', component: RegistroComponent},
  { path: 'recuperar/:idUsuario', component: RecuperarComponent},
  {
    path: 'usuarios',
    component: UsuariosComponent,
    children: Usuario_routes
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    children: Adminsitrador_routes
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
