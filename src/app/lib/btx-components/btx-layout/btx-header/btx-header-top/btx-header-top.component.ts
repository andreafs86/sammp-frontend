import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'btx-header-top',
  templateUrl: './btx-header-top.component.html',
})
export class BtxHeaderTopComponent implements OnInit {

  
  private                         _btnMenu:       boolean = false;
  @Input('btx-menu-side')         btnMenuSide:    string  = 'right';
  @Input('btx-initials-system')   siglaSistema:   string;
  @Input('btx-system')            nomeSistema:    string;
  @Input('btx-open')              menuOpen:       boolean = false;
  @Input('btx-color')             color:          string = 'azu-s';


  /**
   * 
   */
  @Input('btx-menu') set btnMenu(value:boolean){
    this._btnMenu = true;
  }

  /**
   * 
   */
  get btnMenu():boolean{
    return this._btnMenu;
  }

  constructor() { }

  ngOnInit(): void {
  }

  @Output('btx-open-menu') menu = new EventEmitter();

  /**
   * Output function para abrir menu
   * @param e 
   */
  openMenu(e){
    e.stopPropagation();

    this.menu.emit(null);
  }
}
