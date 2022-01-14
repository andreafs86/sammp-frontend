import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsoleLogService } from 'src/app/lib/services/console-log.service';
import { CadastroService, RequisicaoMudanca } from './cadastro.service';
import { DialogMensagem } from '../util/mensagem.component';
import {MatDialog} from '@angular/material/dialog';
import {BtxInputComponent} from '../lib/btx-components/btx-field/btx-input/btx-input.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form:HTMLElement; 
  public isValid:boolean;
  rms: Array<RequisicaoMudanca> = [];
  rmsFiltered: Array<RequisicaoMudanca> = [];
  buscador:number ;
  p:number = 1;

  constructor(private console: ConsoleLogService, private cadastroService: CadastroService, public dialog: MatDialog) { }

  @ViewChild("siglaSistema") eSiglaSistema: BtxInputComponent;
  @ViewChild("numeroRtc") eNumeroRtc: BtxInputComponent;
  @ViewChild("dataEntrega") eDataEntrega: BtxInputComponent;
  @ViewChild("dataCrq") eDataCrq: BtxInputComponent;
  @ViewChild("dataPrevista") eDataPrevista: BtxInputComponent;
  @ViewChild("dataImplantacao") eDataImplantacao: BtxInputComponent;
  @ViewChild("resumo") eResumo: BtxInputComponent;
  @ViewChild("detalhe") eDetalhe: BtxInputComponent;

  ngOnInit(): void { 
    this.form = document.getElementById('formularioCadastro');
    this.list();
  }

  list(): void {
    this.cadastroService.list().subscribe({
      next: data => {
        console.log("listado com sucesso");
        console.log(data);
        this.rms = data;
        this.rmsFiltered = this.rms;
      },
      error: error => {
        this.dialog.open(DialogMensagem, {
          data: {
            mensagem: error.message
          }
        });
        console.error(error.message, error);
      }  
    });
  }

  onKeyup(event: KeyboardEvent){
    console.log("onKeyup")
    console.log(this.buscador);
    if(this.buscador && this.buscador.toString().length > 0){
      this.rmsFiltered = this.rms.filter(r => r.numeroRtc.toString().includes(this.buscador.toString()));
    }else{
      this.rmsFiltered = this.rms;
    }
    console.log(this.rmsFiltered);
  }

  formValid(){

    var valid = true;

    this.form.querySelectorAll('input,select').forEach((element:HTMLInputElement) =>{
      if(!element.checkValidity())
        valid = false;        
    });

    this.isValid = valid;
  }
  
  onSubmit(f:NgForm){
    
    if(this.isValid){
      console.log(f.value);

      this.cadastroService.postRM(f.value).subscribe({
        next: data => {
          this.dialog.open(DialogMensagem, {
            data: {
              mensagem: "Operação efetuada com sucesso!"
            }
          });
          console.log("inclusão com sucesso");
          this.list();
        },
        error: error => {
          this.dialog.open(DialogMensagem, {
            data: {
              mensagem: error.message
            }
          });
          console.error(error.message, error);
        }  
      });;
    }
    
  }

  detalhar(f:NgForm, rm:RequisicaoMudanca){
    f.setValue(rm);
    document.getElementById('numeroRtc').focus();
    console.log('detalhar RM');
  }

  limpar(f:NgForm){
    f.form.reset();
    this.eSiglaSistema.cleanInput();
    this.eNumeroRtc.cleanInput();
    this.eDataEntrega.cleanInput();
    this.eDataCrq.cleanInput();
    this.eDataPrevista.cleanInput();
    this.eDataImplantacao.cleanInput();
    this.eResumo.cleanInput();
    this.eDetalhe.cleanInput();
    console.log("limpeza do cadastro");
  }

  excluir(rm:RequisicaoMudanca){
    this.cadastroService.excluir(rm).subscribe({
      next: data => {
        this.dialog.open(DialogMensagem, {
          data: {
            mensagem: "Operação efetuada com sucesso!"
          }
        });
        console.log("exclusão com sucesso");
        this.list();
      },
      error: error => {
        this.dialog.open(DialogMensagem, {
          data: {
            mensagem: error.message
          }
        });
        console.error(error.message, error);
      }  
    });
  }
}
