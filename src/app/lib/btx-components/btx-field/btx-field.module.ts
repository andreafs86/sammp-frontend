import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxDatepickerComponent } from './btx-datepicker/btx-datepicker.component';
import { BtxInputComponent } from './btx-input/btx-input.component';
import { BtxSelectComponent } from './btx-select/btx-select.component';



@NgModule({
  declarations: [
    BtxDatepickerComponent,
    BtxInputComponent,
    BtxSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BtxDatepickerComponent,
    BtxInputComponent,
    BtxSelectComponent
  ]
})
export class BtxFieldModule { }
