import { ImovelRoutingModule } from './imovel-routing.module';
import { ImovelListComponent } from './imovel-list/imovel-list.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from "src/app/shared/shared.module";
import { ImovelCreateComponent } from './imovel-create/imovel-create.component';
import { ImovelEditComponent } from './imovel-edit/imovel-edit.component';
import { ImovelDeleteComponent } from './imovel-delete/imovel-delete.component';
import { NgxOwlCarouselOModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations:[
    ImovelListComponent,
    ImovelCreateComponent,
    ImovelEditComponent,
    ImovelDeleteComponent
  ],
  imports: [
    CommonModule,
    ImovelRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxOwlCarouselOModule,
    NgxMaskModule.forRoot()
  ]
})
export class ImovelModule{}
