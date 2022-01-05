import { Component, OnInit, HostListener, Input } from '@angular/core';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'btx-navbar-navigation',
  templateUrl: './btx-navbar-navigation.component.html',
})
export class BtxNavbarNavigationComponent implements OnInit {

  private _options:      any[];
  private _direction:    string = 'top';
  public _showMenu:      boolean = false;
  
  // public 
  public subOptions: any[];
  public keyActive:  any[];

  private readonly directionAcepted = ['top','left'];
  
  
  @Input('btx-open')      isOpenSubOptions: boolean = false;

  constructor(private console: ConsoleLogService, private route: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(){
    let _this = this;
    setInterval(function(){

      _this.setPaddingCustom();
    },100)
  }
  

  /**
   * 
   */
  @Input('btx-show-menu')  set showMenu(value:boolean){
    this._showMenu = value;
    
      this.setPaddingCustom();
  }

  get showMenu():boolean{
    return this._showMenu;
  }
  /**
   * 
   */
  @Input('btx-options') set options(options:any){
    this._options = options;
  }

  get options():any{
    return this._options;
  }

  /**
   * 
   */
  @Input('btx-direction') set direction(direction:string){
    if(this.directionAcepted.indexOf(direction) > -1){
      this._direction = direction;
    }
    else{
      this.console.error(`[BTX-NAVBAR-NAVIGATION] O direcionamento [${direction}] não é aceito, os direcionamento aceitos são ${this.directionAcepted.toString()}`);
    }
  }

  get direction():string{
    return this._direction;
  }

  /**
   * 
   * @param option any
   */
  openChilds(option){

    this.isOpenSubOptions = true;
    if(option.hasOwnProperty('childs')) {
      
      if(this.subOptions != option.childs)
        this.subOptions = option.childs;
      else
        this.subOptions = this.keyActive;

      for(let item in option.childs){
        let category = option.childs[item];

        if(category.hasOwnProperty('childs'))
          this.keyActive = option;
      }

    }else
      this.route.navigate([option.route]);

  }

  closeChilds(){
    this.isOpenSubOptions = false;
    this.subOptions = [];
    this.keyActive = [];
  }

  openMenu(){
    this.showMenu = true;
  }

  /**
   * 
   * @param option 
   */
  isActive(option):boolean {
    
    return this.subOptions == option || option == this.keyActive;
  }
  /**
   *
   */
  @HostListener('window:resize')
  setPaddingCustom(){

    if(this.showMenu && this._direction == 'left'){
      let containerWidth = document.querySelector('.container').clientWidth;
      let paddingCustom = ((window.innerWidth - containerWidth) / 2);
  
  
        let leftNavBar = document.querySelector('.btx-navigation .left-navbar') as any;
        leftNavBar.style.paddingLeft = `${paddingCustom}px`;
  
        if(containerWidth == 1176)
          leftNavBar.style.width = `${containerWidth * 0.3}px`;
        else if(containerWidth == 1176)
          leftNavBar.style.width = `${containerWidth * 0.4}px`;
        else if(containerWidth < 768)
          leftNavBar.style.width = `${containerWidth}px`;
    }
  }
}