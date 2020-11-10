import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarComponent } from './components/login/recuperar/recuperar.component';
import { NavusuariosComponent } from './components/usuarios/navusuarios/navusuarios.component';
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { NavadministradorComponent } from './components/administrador/navadministrador/navadministrador.component';
import { CategoriasComponent } from './components/administrador/categorias/categorias.component';
import { ProductosComponent } from './components/usuarios/productos/productos.component';
import { ComparComponent } from './components/usuarios/compar/compar.component';
import { ComentariosComponent } from './components/usuarios/comentarios/comentarios.component';
import { DenunciaComponent } from './components/usuarios/denuncia/denuncia.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    NavusuariosComponent,
    PerfilComponent,
    AdministradorComponent,
    NavadministradorComponent,
    CategoriasComponent,
    ProductosComponent,
    ComparComponent,
    ComentariosComponent,
    DenunciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
