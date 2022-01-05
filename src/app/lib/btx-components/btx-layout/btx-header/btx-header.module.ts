import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtxHeaderComponent } from './btx-header/btx-header.component';
import { BtxHeaderTopComponent } from './btx-header-top/btx-header-top.component';
import { BtxNavbarNavigationComponent } from './btx-navbar-navigation/btx-navbar-navigation.component';



@NgModule({
  declarations: [
    BtxHeaderComponent,
    BtxHeaderTopComponent,
    BtxNavbarNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BtxHeaderComponent,
    BtxHeaderTopComponent,
    BtxNavbarNavigationComponent
  ]
})
export class BtxHeaderModule { }
