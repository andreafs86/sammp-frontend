import { Component, OnInit, Input, Directive, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ConsoleLogService } from '../../../services/console-log.service';
import { BtxGlobalAttributesComponent } from '../../btx-global-attributes/btx-global-attributes.component';

@Component({
  selector: 'btx-button',
  templateUrl: './btx-button.component.html'
})

/**
 * @description
 *
 * O `btx-button` permite que o usuário execute ações predefinidas pelo desenvolvedor.
 *
 * Através das categorias, é possível identificar a importância de cada ação, sendo ela primária (`primary`) ou até mesmo uma
 * ação irreversível (`danger`), como a exclusão de um registro.
 *
 * @example
 * 
    <btx-button 
      btx-label="Aux"
      btx-type="button"
      btx-category="aux"
      btx-class="btx-m-l-16"
      btx-icon-direction="left"
    ></btx-button>
 * 
 * #### Boas práticas
 *
 * - Utilize apenas um `btx-button` configurado como `primary` por página.
 * - Para ações irreversíveis use sempre o tipo `danger`.
 * @author Luigi Oliveira <ljoliveira@stefanini.con>
 */
export class BtxButtonComponent extends BtxGlobalAttributesComponent implements OnInit{

  private _disabled?:       any = false; // Para desabilitar o botão
  private _autofocus?:      boolean = false; // Para dar foco no botão
  private _category?:       string =''; // Define a categoria do botão
  private _size?:           string = 'st'; // Define o tamanho do botão
  private _class?:          string; // Para adicionar novas classes css no botão
  private _type?:           string = 'button'; // Define o tipo do botão
  private _link?:           string; // Quando link, define a rota do botão
  private _icon?:           string; // Define qual icone o botão vai ter
  private _iconDirection?:  string = 'right'; // Define se o botão vai estar na direita ou esquerda

  // Helper atribute
  public helperFocus?:            boolean = true; 

  /**
   * @constructor
   * @param console {ConsoleLogService}
   */
  constructor(private console:ConsoleLogService){
    super()
  }
  


  @Output('btx-offline')      offline?        = new EventEmitter(); // Evento que vai ser disparado quando se perder a conexão com a rede
  @Output('btx-online')      online?        = new EventEmitter(); // Evento que vai ser disparado quando voltar a conexão com a rede

  /**
   * @description
   * 
   * Iniciando o componente
   * 
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  ngOnInit() {

    var _this = this;

    // Adicionando obersevardor de rede se necessário
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

    // Adicionando observador de orientação device se necessário
    if(this.deviceorientation.observers.length){
        window.addEventListener("deviceorientation", function(event) {
          _this.deviceorientation.emit({event,_this})
      }, true);
    }
    
    // Mostrar Helper Messages em console quando estiver em ambiente de desenvolvimento
    this.showMessages();
  }

  /**
   * @description 
   * 
   * Padrão de tamanhos aceitos
   * 
   * @readonly
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  private readonly SIZE_ACCEPTED = ['st','sm','xs'];

  /**
   * @description 
   * 
   * Todos os tipos aceitos
   * 
   * @readonly
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  readonly  TYPE_ACCEPTED = ['button','reset','submit','link'];

  /**
   * @description
   * 
   * Nomenclatura de categorias aceitas
   * 
   * @readonly
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  readonly CATEGORY_ACCEPTED = ['danger','primary','aux_dest','aux','selected','secondary'];

  /** 
   * @description
   * 
   *  Label do botão
   * 
   * @optional
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-label')       label?:string;

   
  /** 
   * @description
   * 
   *  Ícone do botão
   * 
   * @optional
   * @param [string] - Ícone selecionado
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-icon')  set icon(icon:string){

      let subIcon = icon.slice(0,3);

      if(subIcon == "fa-" || subIcon == "cx-")
        this._icon = icon;
      else
        this.console.error(`O ícone ${icon} não é aceito, acesse https://bit.ly/2Sw98Pd para visitar a biblioteca de ícones `); 
  };
  get icon(){
    return this._icon;
  }

  /** 
   * @description
   * 
   *  Lado do botão
   * 
   * @optional
   * @default "right"
   * @param [string] - Lado
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-icon-direction') set iconDirection(iconDirection:string){

    const DIRECTION_ICON_ACCEPT = ['left','right'];

    if(DIRECTION_ICON_ACCEPT.indexOf(iconDirection) > -1)
    this._iconDirection = iconDirection;
  else
    this.console.error(`O lado [${iconDirection}] não é aceito, lados aceitos: ${DIRECTION_ICON_ACCEPT.toString()}`);
  }

  get iconDirection(){
    return this._iconDirection;
  }
  

  /** 
   * @description
   * 
   * Classes css adicionais
   * 
   * @optional
   * @param classes [string] - Classes que serão adicionadas
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-class') set class(classes: string) {

    let btxComponent = this;
    classes.split(' ').forEach(function(value) {

      const CLASS_DONT_ACCEPTED = btxComponent.SIZE_ACCEPTED.concat(btxComponent.CATEGORY_ACCEPTED);

      if(CLASS_DONT_ACCEPTED.indexOf(value) > -1 || value == undefined)
      {  
        btxComponent.console.error(`A classe css [${value}]não é permitida no btx-button,lista de classes não aceitas: ${CLASS_DONT_ACCEPTED.toString()}`);
      }
      else
      {
        let atualClass = btxComponent._class || '';
        btxComponent._class = atualClass +' '+ value; 
      }

    });
  }

  get class():string{
    return this._class;
  }

  /** 
   * @description
   * 
   * Adiciona os tipos aceitos no botão
   * 
   * @optional
   * @param type [string] - Tipo do botão aceitos[button,reset,submit,link]
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-type')  set type(type:string){
    
    if(this.TYPE_ACCEPTED.indexOf(type) > -1)
      this._type = type;
    else
      this.console.error(`O Tipo [${type}] não é aceito, tipos aceitos: ${this.TYPE_ACCEPTED.toString()}`);

  }

  get type(): string {
    return this._type;
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
   * @description
   * 
   * Adiciona autofocus no botão
   * 
   * @optional
   * @param value [boolean] - Se tem ou não foco
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  @Input('btx-autofocus') set autofocus(value: boolean) {
    this._autofocus = true;
  }

  /** @author Luigi Oliveira <ljoliveira@stefanini.com> */
  get autofocus():boolean{
    return this._autofocus;
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
  @Input('btx-size') set size(value: string) {
    if(this.SIZE_ACCEPTED.indexOf(value) > -1)
      this._size = value;
    else
      this.console.error('Tamanho não aceito, os tamanhos são aceitos: st:standard|sm:small|xs:extra small');
  }
  get size():string{
    return this._size;
  }

  /**
   * @description
   * 
   * Adiciona categoria ao botão, categorias aceitas: ['danger','primary','aux_dest','selected']
   * 
   * @optional
   * @param [string] - Categoria adicionada
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  @Input('btx-category') set category(category: string) {

    if(this.CATEGORY_ACCEPTED.indexOf(category) > -1)
      this._category = category;
    else
      this.console.error(`A Categoria [${category}] não é valida,o btx-button aceita as categorias: ${this.CATEGORY_ACCEPTED.toString()}`);
  }
  get category():string{
    if(!this._category)
      this._category = 'aux';
      return this._category;
    }

  /**
   * @description
   * 
   * Adiciona uma rota no botão
   * 
   * @optional
   * @param link [string] - Rota que vai redirecionar
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  @Input('btx-link') set link(link:string){

    if(this._type == 'link'){
      this._link = link;
    }
    else{
      this.console.error('Para receber um link o botão deve ser do tipo link');
    }
  }
  get link():string{
    return this._link;
  }



  @Output('btx-click')                click?                  = new EventEmitter();
  @Output('btx-alt-click')            altClick?               = new EventEmitter();
  @Output('btx-scroll-click')         mouseup?               = new EventEmitter();
  @Output('btx-focus')                focus?                  = new EventEmitter();
  @Output('btx-mouseleave')           mouseleave?             = new EventEmitter();
  @Output('btx-mouseenter')           mouseenter?             = new EventEmitter();
  @Output('btx-right-click')          contextmenu?            = new EventEmitter();
  @Output('btx-blur')                 blur?                   = new EventEmitter();
  @Output('btx-drag')                 drag?                   = new EventEmitter();
  @Output('btx-dragend')              dragend?                = new EventEmitter();
  @Output('btx-drop')                 drop?                   = new EventEmitter();
  @Output('btx-accelerometer')        deviceorientation?      = new EventEmitter();


  /**
   * Disapara evento 
   */
  onEvent(event:UIEvent){

    var _this = this;

    const eventsJs = {
        click:(event:MouseEvent)         => {

          if(event.altKey)
            return _this.altClick.emit({event,_this})
          if(!event.altKey)
            return _this.click.emit({event,_this})

        },
        focus:(event)         => _this.focus.emit({event,_this}),
        mouseleave:(event)    => _this.mouseleave.emit({event,_this}),
        mouseenter:(event)    => _this.mouseenter.emit({event,_this}),
        contextmenu:(event)   => _this.contextmenu.emit({event,_this}),
        blur:(event)          => _this.blur.emit({event,_this}),
        drag:(event)          => _this.drag.emit({event,_this}),
        dragend:(event)       => _this.dragend.emit({event,_this}),
        drop:(event)          => _this.drop.emit({event,_this}),
        mouseup:(event)       => {
          if(event.button == 1)
            _this.mouseup.emit({event,_this});
        }
    }

    eventsJs[event.type](event);
  }

  /**
   * Função que mostra 
   * @author Luigi Oliveira <ljoliveira@stefanini.com> 
   */
  showMessages()
  {
    // if(this.title == ""){
    //   this.console.warning('A Tag Title não foi inserida no btx-button');
    // } 

    if(this._type == 'link' && !this._link){
      this.console.error('Quando do tipo link o botão deve receber o atributo [btx-link] contendo a rota do link');
    }
  }


  /**
   * Remove class to Focus
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  removeFocus(){
    this.helperFocus = false
  }

  /**
   * Add class to Focus
   * @author Luigi Oliveira <ljoliveira@stefanini.com>
   */
  addFocus(){
    this.helperFocus = true;
  }
}
