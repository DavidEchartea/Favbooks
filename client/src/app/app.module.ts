import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LibFavoritosComponent } from './componentes/lib-favoritos/lib-favoritos.component';
import { LibPendientesComponent } from './componentes/lib-pendientes/lib-pendientes.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './componentes/header/header.component';
import { SearchComponent } from './componentes/search/search.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { UserDataComponent } from './componentes/user-data/user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LibFavoritosComponent,
    LibPendientesComponent,
    NavbarComponent,
    HomeComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    UserDataComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
