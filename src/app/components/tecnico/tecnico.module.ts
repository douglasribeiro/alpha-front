import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicoRoutingModule } from './tecnico-routing.module';
import { TecnicoCreateComponent } from './tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './tecnico-delete/tecnico-delete.component';
import { TecnicoUpdateComponent } from './tecnico-update/tecnico-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
  ],
  imports: [
    CommonModule,
    TecnicoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TecnicoModule { }
