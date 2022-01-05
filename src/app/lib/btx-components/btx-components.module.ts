import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxButtonModule } from './btx-button';
import { BtxFieldModule } from './btx-field';
import { BtxLayoutModule } from './btx-layout';
import { BtxTableModule } from './btx-table/btx-table.module';
import { BtxHeaderTopComponent } from './btx-layout/btx-header/btx-header-top/btx-header-top.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BtxButtonModule,
    BtxFieldModule,
    BtxLayoutModule,
    BtxTableModule
  ],
  exports:[
    BtxButtonModule,
    BtxFieldModule,
    BtxLayoutModule,
    BtxTableModule
  ]
})
export class BtxComponentsModule { }
