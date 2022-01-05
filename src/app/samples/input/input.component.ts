import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }
  clique:string = 'open'

  ngOnInit(): void {
  }

  dispararEvent(event){
    console.log(event);
  }
  
  cliqueEvent(event){
    event._this.icon = 'fa-user';
    event._this.size = 'sm';
  }

}
