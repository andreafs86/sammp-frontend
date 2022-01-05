import { Component, OnInit } from '@angular/core';
import { BtxButtonComponent } from 'src/app/lib/btx-components/btx-button/btx-button/btx-button.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }

  clickTest(event){
    console.log(event);
  }

  testNetwork(event){
    console.log(event);
    let uiComponent:MouseEvent = event.event;
    let component:BtxButtonComponent = event._this;

    if(uiComponent?.type == 'offline'){  
      component.label = uiComponent?.type.toUpperCase();
      component.disabled = true;
    }
    else{
      component.label = 'Estado da internet';
      component.disabled = false;
    }
  }

}
