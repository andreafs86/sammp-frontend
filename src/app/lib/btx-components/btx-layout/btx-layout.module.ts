import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxHeaderModule } from './btx-header/btx-header.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BtxHeaderModule
  ],
  exports:[
    BtxHeaderModule
  ]
})
export class BtxLayoutModule { }
