import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BtxSelectComponent } from 'src/app/lib/btx-components/btx-field/btx-select/btx-select.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {


  public options = [
    {
      'value':'DF',
      'label':'Distrito Federal',
      'disabled':true
    },
    {
      'value':'AP',
      'label':'Amapá',
    },
    {
      'value':'AM',
      'label':'Amazonas',
    },
    {
      'value':'SP',
      'label':'São Paulo',
    }
  ];
   
  constructor() { }

  ngOnInit(): void {

  }
  /**
   * 
   * @param f 
   */
  enviar(f:NgForm){
    console.log(f.value);
  }

  eventoJs(event:BtxSelectComponent){
    event.label = 'Luigi';
  }
  
}
