import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { NgxMaskModule } from 'ngx-mask';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { InquililinoListComponent } from './components/inquilino/inquililino-list/inquililino-list.component';
import { InquilinoCreateComponent } from './components/inquilino/inquilino-create/inquilino-create.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { TelefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ReferenciaListComponent } from './components/referencia/referencia-list/referencia-list.component';
import { EnderecoEditComponent } from './components/endereco/endereco-edit/endereco-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EnderecoCreateComponent } from './components/endereco/endereco-create/endereco-create.component';
import { EnderecoDeleteComponent } from './components/endereco/endereco-delete/endereco-delete.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    InquililinoListComponent,
    InquilinoCreateComponent,
    EnderecoListComponent,
    TelefoneListComponent,
    ReferenciaListComponent,
    EnderecoEditComponent,
    EnderecoCreateComponent,
    EnderecoDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    
  ],
  providers: [AuthInterceptorProvider,
  MatDatepickerModule, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
