import { Component, OnInit, ElementRef, Input, Output } from '@angular/core';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';

@Component({
  selector: 'btx-datepicker',
  templateUrl: './btx-datepicker.component.html',
  styleUrls: ['./btx-datepicker.component.scss']
})
export class BtxDatepickerComponent implements OnInit {

  private _multiple:        boolean = false;
  private _selectedDate:    any;
  private _defaultDate:     Date;
  private _textDate:        any = 'DD/MM/AAAA';
  public  choiceMode:       string = 'calendar';
  public  calendarOpen:     boolean = false;

  public  beforeBox:     any[] = new Array();
  public  daysBox:      any[] = new Array();
  public  afterBox:      any[] = new Array();
  
  public  readonly monthString:     string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(private console: ConsoleLogService){}

  ngOnInit(){
    
    if(!this._selectedDate)
      this._selectedDate = new Date();
    
      this.getBox();
      
  }
    
  ngAfterOnInit(){
  }

  getBox(){

    this.beforeBox  = [];
    this.daysBox    = [];


    let  ultimoDia = new Date(this._selectedDate);
    ultimoDia = new Date(ultimoDia.getFullYear(),ultimoDia.getMonth(),0);
    
    let  primeiroDia = new Date(this._selectedDate);
    primeiroDia.setDate(1);

    let previosMonth = new Date(
          primeiroDia.getFullYear(), //year
          primeiroDia.getMonth(), // month
          (-primeiroDia.getDay()%7) +1 // day
          );

    for(let i =0; i < primeiroDia.getDay()%7 ;i++){
      let lastDay = previosMonth.getDate();
      this.beforeBox.push(lastDay + i);
    }

    for(let i =0; i <=ultimoDia.getDate();i++)
      this.daysBox.push(i+1);
  }

  /**
   * 
   */
  get defaultDate():Date{
    return this._defaultDate;
  }

  /**
   * 
   */
  @Input('btx-multitple')     set multiple(value:boolean){
    this._multiple = true;
  }

  get multiple(){
    return this._multiple;
  }

  /**
   * 
   */
  @Input('btx-value')     set selectedDate(value){
    this._selectedDate = new Date(value);

    this.getBox();
  }

  get selectedDate(){
    return this._selectedDate;
  }

  get textDate():String{
    return this._textDate;
  }

  openCalendar(){
    this.calendarOpen = !this.calendarOpen;
  }

  openChoice(){ 
    this.choiceMode = (this.choiceMode == 'calendar') ? 'month-year' : 'calendar';
  }
}
