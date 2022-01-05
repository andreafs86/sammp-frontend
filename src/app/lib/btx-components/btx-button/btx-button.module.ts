import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxButtonComponent } from './btx-button/btx-button.component';

@NgModule({
  declarations: [BtxButtonComponent],
  imports: [
    CommonModule
  ],
  exports:[BtxButtonComponent]
})
export class BtxButtonModule { }
