import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelListComponent } from './imovel-list/imovel-list.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations:[
    ImovelListComponent
  ],
  imports: [
    CommonModule,
    ImovelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ImovelModule{}
