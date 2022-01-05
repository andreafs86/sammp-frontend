import { Component, OnInit } from '@angular/core';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

 
  form:HTMLElement; 
  public isValid:boolean;

  constructor(private console: ConsoleLogService) { }

  ngOnInit(): void { 
    this.form = document.getElementById('formulario');
  }


  formValid(){

    var valid = true;

    this.form.querySelectorAll('input,select').forEach((element:HTMLInputElement) =>{
      if(!element.checkValidity())
        valid = false;        
    });

    this.isValid = valid;
    console.log(this.isValid);
  }
  
  onSubmit(f){
    
    if(this.isValid){
      console.log(f.value);
    }
    
  }


  teste(){
    console.log('testando');
  }
}
