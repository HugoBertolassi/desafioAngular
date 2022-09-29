import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FilmeComponent } from './components/filme/filme.component';
import { GeneroComponent } from './components/genero/genero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modulos material table
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';

//modulos select
import {MatSelectModule} from '@angular/material/select';

// modulo input
import { ReactiveFormsModule } from '@angular/forms';

//modulo http
import {HttpClientModule} from '@angular/common/http';
import { EditarUsuarioDialogComponent } from './view/editar-usuario-dialog/editar-usuario-dialog.component'

//dialog
import {MatDialogModule} from '@angular/material/dialog';

import { EditarGeneroDialogComponent } from './view/editar-genero-dialog/editar-genero-dialog.component';
import { EditarFilmeDialogComponent } from './view/editar-filme-dialog/editar-filme-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsuarioComponent,
    FilmeComponent,
    GeneroComponent,
    EditarUsuarioDialogComponent,
    EditarGeneroDialogComponent,
    EditarFilmeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
