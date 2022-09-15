import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietarioRoutingModule } from './proprietario-routing.module';
import { ProprietarioListComponent } from './proprietario-list/proprietario-list.component';


@NgModule({
  declarations: [
    ProprietarioListComponent,
  ],
  imports: [
    CommonModule,
    ProprietarioRoutingModule
  ]
})
export class ProprietarioModule { }
