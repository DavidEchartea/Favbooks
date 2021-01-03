import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LibFavoritosComponent } from './componentes/lib-favoritos/lib-favoritos.component';
import { LibPendientesComponent } from './componentes/lib-pendientes/lib-pendientes.component';
import { SearchComponent } from './componentes/search/search.component';
import { UserDataComponent } from './componentes/user-data/user-data.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'libros-favoritos', component: LibFavoritosComponent},
  {path: 'libros-pendientes', component: LibPendientesComponent},
  {path: 'buscar', component: SearchComponent},
  {path: 'perfil', component: UserDataComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: HomeComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
