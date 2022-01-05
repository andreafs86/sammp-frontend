import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  public fonts = new Array();
  

  constructor(){
    for(let i = 1; i <= 20 ; i++ ){
      this.fonts.push(i);
    }
  }

  ngOnInit() {
  }
}
