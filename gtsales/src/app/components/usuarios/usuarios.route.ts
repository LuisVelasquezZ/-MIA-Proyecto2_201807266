import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ComparComponent } from './compar/compar.component';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductosComponent } from './productos/productos.component';


export const Usuario_routes : Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: '', pathMatch: 'full', redirectTo:'perfil'},
  { path: 'misproductos', component: ProductosComponent },
  { path: 'comprar', component: ComparComponent },
  { path: 'carrito', component: ComentariosComponent },
  { path: 'denuncia/:idproducto', component: DenunciaComponent }
];