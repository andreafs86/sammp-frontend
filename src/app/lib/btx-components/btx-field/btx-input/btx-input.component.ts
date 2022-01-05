import { Component, OnInit, Input, Output,EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';
import { NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { BtxGlobalAttributesComponent } from '../../btx-global-attributes/btx-global-attributes.component';
import { trigger, style, animate, transition, state } from '@angular/animations';


@Component({
  selector: 'btx-input',
  templateUrl: './btx-input.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BtxInputComponent),
      multi: true
    }
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ]
})


/**
 * @description
 *
 * O 'btx-input' é usado como campo de texto
 * 
 * @example
 * 
 * <btx-input
      btx-validate
      btx-size="st"
      btx-complementary-text="Texto complementar"
      btx-placeholder="Seu Email"
      ngModel
      btx-icon="fa-user"
      btx-min-length="15"
      btx-message-validate="Deve ser um email com 15 caracteres"
      name="claudio"
      btx-type="email"
      btx-required
      btx-icon-direction="left"
      btx-label="Email"
      btx-name="claudio">
  </btx-input>
 * 
 
 * 
 * 
 * @author Luigi Oliveira <ljoliveira@stefanini.con>
 */
export class BtxInputComponent extends BtxGlobalAttributesComponent implements OnInit,ControlValueAccessor {
  
  private _max?:            number;
  private _min?:            number;
  private _maxlength?:      number;
  private _minlength?:      number;
  private _icon?:           string;
  private _acceptType?:     string[];
  private _value?:          string;

  private _iconDirection?:  string = 'left';
  private _type?:           string = 'text';
  private _size?:           string = 'st';
  private _disabled?:       boolean = false;
  private _autocomplete?:   boolean = false;
  private _readonly?:       boolean = false;
  private _required?:       boolean = false;
  private _autofocus?:      boolean = false;
  private _clean?:          boolean = false;
  private _validate:        boolean = false;
  private _isVoice:         boolean = true;
  private _messageValidate?:string;
  private _isShowOptions?:    boolean = false;
  
  public isClean?:          boolean;

  public isValid:           boolean = true;
  public focusIn:           boolean = false;
  public voiceStatus:       boolean = false;
  public isShowPass?:       boolean = false;
  public inputElement?:     any     = this.element.nativeElement.querySelector('input');


  @Input('name')                      name:             string;
  
  @Input('btx-label')                 label:            string;
  @Input('btx-pattern')               pattern:          string;
  @Input('btx-complementary-text')    complemetaryText: string;
  @Input('btx-state')                 state:            string;
  @Input('btx-placeholder')           placeholder:      string  = 'Digite aqui';


  readonly ACCEPT_SIZE = ['st','sm','xs'];
  readonly TYPE = {
        'email': {
          'icon'    : 'fa-envelope-square',
          'message' : 'O campo deve ser um email'
        },
        'number':{
          'icon'    :'cx-number',
          'message'    :'O campo deve ser um número',
        },
        'password':{
          'icon':'fa-unlock-alt',
        },
        'date':{
          'icon':'fa-calendar-alt',
          'message':'O camp deve ser um horário'
        },
        'time':{
          'icon':'fa-clock',
          'message':'O camp deve ser um horário'
        },
        'money':{
          // 'icon':'cx-real', TODO ICON cx-real
          'icon':'fa-dollar-sign',
          'message':'O campo deve ser um valor'
        },
        'url':{
          'icon':'fa-globe',
          'message':'O campo deve ser uma URL'
        }
      };


  @Output('btx-click')                click?                  = new EventEmitter();
  @Output('btx-alt-click')            altClick?               = new EventEmitter();
  @Output('btx-scroll-click')         mouseup?               = new EventEmitter();
  @Output('btx-focus')                focus?                  = new EventEmitter();
  @Output('btx-keyup')                keyup?                  = new EventEmitter();
  @Output('btx-keydown')              keydown?                = new EventEmitter();
  @Output('btx-mouseleave')           mouseleave?             = new EventEmitter();
  @Output('btx-mouseenter')           mouseenter?             = new EventEmitter();
  @Output('btx-select')               select?                 = new EventEmitter();
  @Output('btx-change')               change?                 = new EventEmitter();
  @Output('btx-input')                input?                  = new EventEmitter();
  @Output('btx-cut')                  cut?                    = new EventEmitter();
  @Output('btx-copy')                 copy?                   = new EventEmitter();
  @Output('btx-right-click')          contextmenu?            = new EventEmitter();
  @Output('btx-blur')                 blur?                   = new EventEmitter();
  @Output('btx-drag')                 drag?                   = new EventEmitter();
  @Output('btx-dragend')              dragend?                = new EventEmitter();
  @Output('btx-drop')                 drop?                   = new EventEmitter();
  @Output('btx-focusin')              focusin?                = new EventEmitter();
  @Output('btx-wheel')                wheel?                  = new EventEmitter();
  @Output('btx-accelerometer')        deviceorientation?      = new EventEmitter();
  


  onEvent(event:UIEvent){

    var _this = this;
    // console.log(event);

    const eventsJs = {
        click:(event:MouseEvent)         => {

          if(event.altKey)
            return _this.altClick.emit({event,_this})
          if(!event.altKey)
            return _this.click.emit({event,_this})

        },
        focus:(event)         => _this.focus.emit({event,_this}),
        keyup:(event)         => _this.keyup.emit({event,_this}),
        mouseleave:(event)    => _this.mouseleave.emit({event,_this}),
        mouseenter:(event)    => _this.mouseenter.emit({event,_this}),
        select:(event)        => _this.select.emit({event,_this}),
        change:(event)        => _this.change.emit({event,_this}),
        input:(event)         => _this.input.emit({event,_this}),
        cut:(event)           => _this.cut.emit({event,_this}),
        copy:(event)          => _this.copy.emit({event,_this}),
        contextmenu:(event)   => _this.contextmenu.emit({event,_this}),
        blur:(event)          => _this.blur.emit({event,_this}),
        drag:(event)          => _this.drag.emit({event,_this}),
        dragend:(event)       => _this.dragend.emit({event,_this}),
        drop:(event)          => _this.drop.emit({event,_this}),
        keydown:(event)       => _this.keydown.emit({event,_this}),
        wheel:(event)         => _this.wheel.emit({event,_this}),
        mouseup:(event)       =>{
          if(event.button == 1)
            _this.mouseup.emit({event,_this});
        }

    }

    eventsJs[event.type](event);
  }
  
  constructor(private console: ConsoleLogService, private element:ElementRef) { 

    super();
    let _accept = new Array();

    for(let type in this.TYPE){
      _accept.push(type);
    }

    _accept.push('hidden');
    _accept.push('text');

    this._acceptType = _accept;
  }
 

  @Output('btx-offline')      offline?        = new EventEmitter();
  @Output('btx-online')      online?        = new EventEmitter();

  ngOnInit(): void {

    var _this = this;

    if(this.offline.observers.length || this.online.observers.length )
    {
      this.isConnected.subscribe((isConnected) =>{
          if(!isConnected)
            _this.offline.emit({event,_this});
          else
            _this.online.emit({event,_this});
        }
      )
    }

    if(this.deviceorientation.observers.length){
        window.addEventListener("deviceorientation", function(event) {
          _this.deviceorientation.emit({event,_this})
      }, true);
    }

    if(this.title == ""){
      this.console.warning('O atributo Title não foi inserido no btx-input');
    }
    
    if(this._required && !this._validate)
      this.console.warning('O atributo [btx-required] não funciona sem o atributo [btx-validate]');

    if(this._value)
      this.element.nativeElement.querySelector('input').value = this._value;


  }

  ngAfterContentInit() {
    this.propagateValue();
  }
  
  /**
   * 
   */
  @Input('btx-show-options')      set isShowOptions(atribute:boolean){
    this._isShowOptions = true;
  }
  get isShowOptions():boolean{
    return this._isShowOptions;
  }

  /**
   * 
   */
  @Input('btx-value')              set value(atribute:string){
    this._value = atribute;
  }
  get value():string{
    return this._value;
  }
  
  @Input('btx-no-voice')        set isVoice(value:boolean){
    this._isVoice = false;
  }

  get isVoice():boolean{
    return this._isVoice;
  }
  /**
   * 
   */
  @Input('btx-message-validate') set messageValidate(value:string){ 

    if(this._acceptType.indexOf(this._type) > -1 && this._type != 'text'){
      this.console.warning(`O tipo [${this._type}] tem uma mensagem de erro padrão`);
    }

    this._messageValidate = value;
  }

  get messageValidate():string {

    if(this._required && this.value == '' && this.state != 'error' && this.state != 'success')
      return 'Este campo é obrigatorio';
    else if(this._messageValidate)
      return this._messageValidate;
    else if(this._type != 'text')
      return this.TYPE[this._type].message;

      return 'Campo invalido';
  }

  /**
   * 
   */
  @Input('btx-max-length') set maxlength(maxlength:number){

      if(this._type == 'email' || this._type == 'text')
        this._maxlength = maxlength;
      else
        this.console.error('Somente os inputs de tipo [email,text] podem receber o atribute [maxlenght]');
  };

  get maxlength():number{
    return this._maxlength;
  }

  @Input('btx-min-length') set minlength(minlength:number){

    if(this._type == 'email' || this._type == 'text')
    this._minlength = minlength;
  else
    this.console.error('Somente os inputs de tipo [email,text] podem receber o atribute [minlength]');
  }

  get minlength():number{
    return this._minlength;
  }

  /**
   * 
   */
  @Input('btx-max') set max(max:number){

    if(this._type == 'number' || this._type == 'money')
      this._max = max;
    else
      this.console.error('Somente os inputs de tipo [number,money] podem receber o atribute [max]');
  }

  get max():number{
    return this._max;
  }

  /**
   * 
   */
  @Input('btx-min') set min(min:number){

    if(this._type == 'number' || this._type == 'money')
      this._min = min;
    else
      this.console.error('Somente os inputs de tipo [number,money] podem receber o atribute [btx-min]');
  }

  get min():number{
    return this._min;
  }


  @Input('btx-type') set type(type:string){

    if(this._acceptType.indexOf(type) > -1){

      this._type = type;
      
      if(!(type == 'text' || type == 'hidden') && this._icon)
        this._icon = this.TYPE[this._type].icon;
    }
    else{
      this.console.error(`O Tipo [${type}] não é aceito, tipos aceitos: ${this._acceptType.toString()}`);
    }
  }

  get type():string {
    return this._type;
  }

  /**
   * 
   */
  @Input('btx-icon') set icon(icon:string){
    
    let subIcon = icon.slice(0,3);

    
    if(subIcon == "fa-" || subIcon == "cx-"){


      if(this._type != 'text' && this._type != 'hidden' ){
        let defaultIcon = this.TYPE[this._type].icon;
  
        if(icon!=defaultIcon)
            this.console.warning(`É recomendado o uso do icon [${defaultIcon}]no input tipo [${this._type}] `);

      }
      
          this._icon = icon;
    }
    else{
      this.console.error(`O ícone [${icon}] não é aceito, acesse https://bit.ly/2Sw98Pd para visitar a biblioteca de ícones `); 
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
    
  @Input('btx-icon-direction') set iconDirection(direction:string){
    
    if(direction == 'left' || direction == 'right')
      this._iconDirection = direction;
    else
      this.console.error('[btx-icon-direction] não aceito,os valores aceitos são: left,right'); 
  }

  get iconDirection():string{
    return this._iconDirection;
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
    this._disabled = (value == 'true' || value == 1 || value == '' && value != false  && value != 0 ) ;
  }

  get disabled():any{
    return this._disabled;
  }

  /**
   * 
   */
  @Input('btx-autocomplete') set autocomplete(value:boolean){
    this._autocomplete = true;
  }

  get autocomplete():boolean{
    return this._autocomplete;
  }

  @Input('btx-readonly') set readonly(value:boolean){
    this._readonly=true;
  }

  get readonly():boolean{
    return this._readonly;
  }
  

  @Input('btx-required') set required(value:boolean){
    this._required = true;
  }

  get required():boolean{
    return this._required;
  }

  @Input('btx-autofocus') set autofocus(value:boolean){
    this._autofocus = true;
  }

  get autofocus():boolean{
    return this._autofocus;
  }

  /**
   * 
   */
  @Input('btx-no-clean') set clean(clean:boolean){
    this._clean        = false;
  }

  get clean():boolean{
    return this._clean;
  }

  /**
   * 
   */
  @Input('btx-validate') set validate(clean:boolean){
    this._validate        = true;
  }

  get validate():boolean{
    return this._validate;
  }

  openOption(){
      this._isShowOptions = true;
  }

  cleanInput(){
    this.value = '';
    this.element.nativeElement.querySelector('input').value = '';
    this.propagateValue();
  }

  showPass(){
      this.isShowPass = !this.isShowPass;

      if(this.isShowPass)
        this._type = 'text';
        else
        this._type = 'password';
  }

  /**
   * 
   */
  validateInput(event){

    if(this._validate){
      
      let inputElement:any = this.element.nativeElement.querySelector('input');
      this.isValid = inputElement.checkValidity();
    }
  }

 
  /**
   * 
   * @param event 
   */
  onVoice(event:KeyboardEvent){

    if(this._isVoice){

      let _input = this;
  
      if(event.keyCode == 117){
        const {webkitSpeechRecognition} = (window as any);
        let voz = new webkitSpeechRecognition();
  
        voz.start();

        _input.voiceStatus = true;
        let component = this;
  
        voz.addEventListener('result',function(results){

          _input.voiceStatus = false;
          let result = results.results[0][0].transcript;
  
          this._value = result;
  
          if(_input._type == 'email' || _input._type == 'senha')
            result = result.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/ /g,'')
                        .toLowerCase();
  
          component.value = result;
  
        });
      }
    }

    this.propagateValue();
  }

  /**
   * 
   */
  onClean(){

    let valueInput = this.element.nativeElement.querySelector('input').value;
    if(valueInput.length > 0 && this._clean)
      this.isClean = true;
    else
      this.isClean = false;
  }


  /**
   * Remove class to Focus
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  removeFocus(){
    this.focusIn = false
  }

  /**
   * Add class to Focus
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  addFocus(){
    this.focusIn = true;
  }

  writeValue(value: any) {
    this.value = value;
  }

  propagateChange = (_: any) => {

  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  
  registerOnTouched() {}
  
  propagateValue(){
    let valueInput = this.element.nativeElement.querySelector('input')?.value;
    this._value = valueInput;
    this.propagateChange(valueInput);
  }
}