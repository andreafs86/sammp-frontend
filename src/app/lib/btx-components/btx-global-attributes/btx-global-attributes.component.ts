import { Component, Input, Output } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map'

@Component({
  templateUrl: './btx-global-attributes.component.html',
})
export class BtxGlobalAttributesComponent {


  @Input('btx-accesskey')           accesskey:string;
  @Input('btx-lang')                lang:string;
  @Input('btx-tabindex')            tabindex:number;
  @Input('btx-title')               title:string;

  
  private _hidden:boolean;
  private _draggable:boolean;
  private _translate:boolean;
  private _contenteditable:boolean;
  
  protected isConnected: Observable<boolean>



  @Input('btx-contenteditable') set contenteditable(value){
    this._contenteditable = this.getBooleanValue(value);
  }
  
  get contenteditable(){
    return (this._contenteditable ? 'true' : 'false');
  }

  @Input('btx-draggable') set draggable(value){
    this._draggable = this.getBooleanValue(value);
  }
  
  get draggable(){
    return this._draggable;
  }
  
  
  @Input('btx-hidden')  set hidden(value){
    this._hidden = this.getBooleanValue(value);
  };

  get hidden(){
    return this._hidden;
  }

  @Input('btx-translate') set translate(value){
    this._translate = this.getBooleanValue(value);
  }

  get translate(){
    return this._translate;
  }

  getBooleanValue(value){

    return (
        value == 'true' || 
        value == 1 || 
        value == '' ||
        value =='yes' &&
        
        value != false  &&
        value != 0      &&
        value !='no'
         );
  }

  constructor(){
    this.isConnected = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false));
  }
}
