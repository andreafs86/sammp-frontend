import { Component, OnInit, ElementRef, Input, Output, forwardRef } from '@angular/core';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';
import { EventEmitter } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'btx-select',
  templateUrl: './btx-select.component.html',
  styleUrls: ['./btx-select.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BtxSelectComponent),
      multi: true
    }
  ]
})
export class BtxSelectComponent implements OnInit {


  private _size?:           string = 'st';
  private _required:        boolean = false;
  private _validate:        boolean = false;
  private _hasFilter:       boolean = false;
  private _isSearch:        boolean = false;
  public  _isValid:         boolean = true;

  private _disabled:        boolean = false;
  private _isMultiple:      boolean = false;
  private _open:            boolean;
  private _values?:         any = new Array();
  private _optionsSelect:   any = new Array();
  private _min:             number;
  private _max:             number;
  private _icon:            string;
  private _options:         any;
  
  public inputElement?:     any     = this.element.nativeElement.querySelector('input');

  @Input('name')                    name:             string;
  @Input('btx-label')               label:            string;
  @Input('btx-title')               title:            string;
  @Input('btx-complementary-text')   complemetaryText: string;
  @Input('btx-state')               state:            string;
  @Input('btx-message-validate')    messageValidate:  string;
  @Input('btx-placeholder')         placeholder:      string  = 'Selecione uma opção';

  readonly ACCEPT_SIZE = ['st','sm','xs'];


  // @Output('btx-click')                click?                  = new EventEmitter();
  // @Output('btx-alt-click')            altClick?               = new EventEmitter();
  // @Output('btx-scroll-click')         mouseup?                = new EventEmitter();
  // @Output('btx-right-click')          contextmenu?            = new EventEmitter();
  // @Output('btx-focus')                focus?                  = new EventEmitter();
  // @Output('btx-mouseleave')           mouseleave?             = new EventEmitter();
  // @Output('btx-mouseenter')           mouseenter?             = new EventEmitter();
  // @Output('btx-select')               select?                 = new EventEmitter();
  // @Output('btx-change')               change?                 = new EventEmitter();
  // @Output('btx-blur')                 blur?                   = new EventEmitter();
  // @Output('btx-drag')                 drag?                   = new EventEmitter();
  // @Output('btx-dragend')              dragend?                = new EventEmitter();
  // @Output('btx-drop')                 drop?                   = new EventEmitter();
  // @Output('btx-wheel')                wheel?                  = new EventEmitter();
  // @Output('btx-accelerometer')        deviceorientation?      = new EventEmitter();


  // onEvent(event:UIEvent){

  //   var _this = this;
  //   // console.log(event);

  //   const eventsJs = {
  //       click:(event:MouseEvent)         => {

  //         if(event.altKey)
  //           return _this.altClick.emit({event,_this})
  //         if(!event.altKey)
  //           return _this.click.emit({event,_this})

  //       },
  //       focus:(event)         => _this.focus.emit({event,_this}),
  //       keyup:(event)         => _this.keyup.emit({event,_this}),
  //       mouseleave:(event)    => _this.mouseleave.emit({event,_this}),
  //       mouseenter:(event)    => _this.mouseenter.emit({event,_this}),
  //       select:(event)        => _this.select.emit({event,_this}),
  //       change:(event)        => _this.change.emit({event,_this}),
  //       input:(event)         => _this.input.emit({event,_this}),
  //       cut:(event)           => _this.cut.emit({event,_this}),
  //       copy:(event)          => _this.copy.emit({event,_this}),
  //       contextmenu:(event)   => _this.contextmenu.emit({event,_this}),
  //       blur:(event)          => _this.blur.emit({event,_this}),
  //       drag:(event)          => _this.drag.emit({event,_this}),
  //       dragend:(event)       => _this.dragend.emit({event,_this}),
  //       drop:(event)          => _this.drop.emit({event,_this}),
  //       keydown:(event)       => _this.keydown.emit({event,_this}),
  //       wheel:(event)         => _this.wheel.emit({event,_this}),
  //       mouseup:(event)       =>{
  //         if(event.button == 1)
  //           _this.mouseup.emit({event,_this});
  //       }

  //   }

  //   eventsJs[event.type](event);
  // }

  constructor(private console:ConsoleLogService,private element:ElementRef) { }

  ngOnInit(): void {

    if(this.title == ""){
      this.console.warning('O atributo Title não foi inserido no btx-select');
    }
  }
  
  /**
   *  TODO SET MAX COUNT TO OPTIONS SELECTEDS
   */
  @Input('btx-options') set options(options:any){
    this._options = options;
  }

  get options():any{
    return this._options;
  }

  get values():any{
    return this._values;
  }

  /**
   *  TODO SET MAX COUNT TO OPTIONS SELECTEDS
   */
  @Input('btx-options-select') set optionsSelect(options:any){

  }

  get optionsSelect():any{
    return this._optionsSelect
  }

  /**
   *  TODO SET MAX COUNT TO OPTIONS SELECTEDS
   */
  @Input('btx-multiple') set isMultiple(max:boolean){
    this._isMultiple = true;
  }

  get isMultiple():boolean{
    return this._isMultiple;
  }
  /**
   *  TODO SET MAX COUNT TO OPTIONS SELECTEDS
   */
  @Input('btx-max') set max(max:number){
    this._max = max;
  }

  get max():number{
    return this._max;
  }

  /**
   * 
   */
  @Input('btx-min') set min(min:number){
    this._min = min;
  }

  get min():number{
    return this._min;
  }


  /**
   * 
   */
  @Input('btx-icon') set icon(icon:string){
    
    let subIcon = icon.slice(0,3);
    
    if(subIcon == "fa-" || subIcon == "cx-"){
      this._icon = icon;
    }
    else{
      this.console.error(`O ícone [${icon}] não é aceito, acesse https://bit.ly/2Sw98Pd para visitar a biblioteca de ícones`); 
    }
  }
  
  get icon():string{
    return this._icon;
  }

   /** 
   * @description
   * 
   * Adiciona autofocus no botão
   * 
   * @optional
   * @param value [string] - Tipo do botão aceitos[st,sm,xs]
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  @Input('btx-size') set size(size: string) {
    if(this.ACCEPT_SIZE.indexOf(size) > -1)
      this._size = size;
    else
      this.console.error(`O Tamanho [${size}] não é aceito, os tamanhos são aceitos: st:standard,sm:small,xs:extra small`);
  }

  get size():string{
    return this._size;
  }

  /** 
   * @description
   * 
   * Desabilita o botão
   * 
   * @optional
   * @param value [boolean] - Se vai ser desabilitado ou não
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-validate') set validate(value:boolean) {
    this._validate = true;
  }

  get validate():boolean{
    return this._validate;
  }

  /** 
   * @description
   * 
   * Desabilita o botão
   * 
   * @optional
   * @param value [boolean] - Se vai ser desabilitado ou não
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-search') set isSearch(value:boolean) {
    this._isSearch = true;
  }

  get isSearch():boolean{
    return this._isSearch;
  }
  /** 
   * @description
   * 
   * Desabilita o botão
   * 
   * @optional
   * @param value [boolean] - Se vai ser desabilitado ou não
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-disabled') set disabled(value:any) {
    this._disabled = (value == 'true' || value == 1 || value == '' );
  }

  get disabled():any{
    return this._disabled;
  }
  

  /**
   * 
   */
  @Input('btx-required') set required(value:boolean){
    this._required = true;
  }

  get required():boolean{
    return this._required;
  }

  /**
   * 
   */
  @Input('btx-open') set open(value:boolean){
    this._open = true;
  }

  get open():boolean{
    return this._open;
  }

  /**
   * 
   */
  @Input('btx-filter') set hasFilter(value:boolean){
      this._hasFilter = true;
  }

  get hasFilter():boolean{
    return this._hasFilter;
  }

  /**
   * 
   * @param option 
   */
  isSelect(option:any):boolean{
    return this._optionsSelect.indexOf(option) > -1;
  }

  /**
   * 
   */
  unSelectOption(optionSelect:any){
    let index = this._optionsSelect.indexOf(optionSelect);
    
    this._optionsSelect.splice(index,1);

    let optionsValue= new Array();

    this._optionsSelect.forEach(function(option){

      optionsValue.push(option.value);
    });

    this._values = optionsValue;

    this.propagateChange(this._values);

    this.messageValidate = this.validator();
  }

  /**
   * 
   */
  selectOption(optionSelect:any){

    if(optionSelect.disabled == undefined){

      if(!this._isMultiple){
        this._optionsSelect = new Array();
        this._optionsSelect.push(optionSelect);
        this._open = false;

        this.select.emit(optionSelect); // Emitindo evento javascript
      }
      else{

        let index = this._optionsSelect.indexOf(optionSelect);
        if( index == -1){
          
          if(this._max > this.optionsSelect.length || this._max == undefined){

            this._optionsSelect.push(optionSelect);
            this.select.emit(optionSelect); // Emitindo btx-select
          }
        }
        else{
          this._optionsSelect.splice(index,1);
        }
      }

    }
    
    let optionsValue= new Array();
    
    this._optionsSelect.forEach(function(option){
      optionsValue.push(option.value);
    });
    
    this._values = optionsValue.toString();
    
    this.messageValidate = this.validator();

    this.propagateChange(this._values);

    
  }

  /**
   * 
   */
  openOption(){
    if(!this._disabled)
      this._open = !this._open;

      if(!this._open && this._validate)
        this.messageValidate = this.validator();
  }

  /**
   * 
   */
  closeOption(){
    this._open = false;
  }

  validator(){

    if(this._min > this.optionsSelect?.length){
      this.state = 'warning';
      return `São necessárias ${this._min} seleções`;
    }

    if(this.optionsSelect?.length == 0 && this.required){
      this.state = 'warning';
      return this.messageValidate = 'Esse campo é obrigatório';
    }
    this.state = '';
  }

  /**
   * 
   */
  filter(event){
    
    var options = [];
    this._options.map((option) => {

      let filter: RegExp = new RegExp(event.srcElement?.value,"i");

      if(!(filter.test(option.label) || filter.test(option.value)))
        option.hide = true;
      else
        option.hide = false;

      options.push(option);
    });
    
    this._options = options;
  }

   /**
   * 
   */
  @Output('btx-blur')       blur?     = new EventEmitter();

  onBlur(event){
    event.stopPropagation();
    this.blur.emit(event);
  }

  /**
   * 
   */
  @Output('btx-click')      click?    = new EventEmitter();
  
  onClick(){
    this.click.emit(this);
  }
  
  /**
   * 
   */
  @Output('btx-select')     select?   = new EventEmitter();

  /**
   * 
   */
  @Output('btx-mouseenter') mouseover?     = new EventEmitter();

  onMouseenter(){
    this.mouseover.emit(this);
  }

  /**
   * 
   */
  @Output('btx-mouseleave')  mouseleave?      = new EventEmitter();

  onMouseleave(){
    this.mouseleave.emit(this);
  }

  /**
   * 
   */
  @Output('btx-focus') focus? = new EventEmitter();

  onFocus(event){
    event.stopPropagation();

    this.focus.emit(event);
  }

  writeValue(value: any) {
    this._values = value;
  }

  propagateChange = (_: any) => {

  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  
  registerOnTouched() {}
  
  propagateValue(){

    let valueInput = this.element.nativeElement.querySelector('input').value;
    console.log(valueInput);
    this.propagateChange(valueInput);
  }


}
