import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxTableSimpleComponent } from './btx-table-simple/btx-table-simple.component';
import { BtxFieldModule } from '../btx-field';



@NgModule({
  declarations: [BtxTableSimpleComponent],
  imports: [
    CommonModule,
    BtxFieldModule
  ],
  exports:[
    BtxTableSimpleComponent
  ]
})
export class BtxTableModule { }
