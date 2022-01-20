import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  buscadorRtc:string = "";
  buscadorId:string = "";
  p:number = 1;
  id:number = null;

  constructor(private console: ConsoleLogService, private cadastroService: CadastroService, public dialog: MatDialog) { }

  @ViewChild("siglaSistema") eSiglaSistema: BtxInputComponent;
  @ViewChild("numeroRtc") eNumeroRtc: BtxInputComponent;
  @ViewChild("dataEntrega") eDataEntrega: BtxInputComponent;
  @ViewChild("dataCrq") eDataCrq: BtxInputComponent;
  @ViewChild("dataPrevista") eDataPrevista: BtxInputComponent;
  @ViewChild("dataImplantacao") eDataImplantacao: BtxInputComponent;
  @ViewChild("resumo") eResumo: BtxInputComponent;
  @ViewChild("detalhe") eDetalhe: ElementRef<HTMLTextAreaElement>;

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
    console.log(this.buscadorId);
    console.log(this.buscadorRtc);
    
    this.rmsFiltered = this.rms.filter(r => {

      if(this.buscadorId == "" && this.buscadorRtc == ""){
        return true;
      } else if(this.buscadorId != "" && this.buscadorRtc != ""){
        return (
          ((this.buscadorRtc == "" || r.numeroRtc == null) ? 
            false : 
            r.numeroRtc.toString().includes(this.buscadorRtc))
        && 
          (this.buscadorId == "" ? 
            false : 
            r.id.toString().includes(this.buscadorId))
        )
      }else{
        return (
          ((this.buscadorRtc == "" || r.numeroRtc == null) ? 
            false : 
            r.numeroRtc.toString().includes(this.buscadorRtc))
        || 
          (this.buscadorId == "" ? 
            false : 
            r.id.toString().includes(this.buscadorId))
        )

      }
    });

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

      const rm: RequisicaoMudanca = {
        id : this.id,
        siglaSistema : this.eSiglaSistema.value,
        numeroRtc : +this.eNumeroRtc.value,
        dataEntregaString : this.eDataEntrega.value,
        dataCrqString : this.eDataCrq.value,
        dataPrevistaString : this.eDataPrevista.value,
        dataImplantacaoString : this.eDataImplantacao.value,
        resumo : this.eResumo.value,
        detalhe : this.eDetalhe.nativeElement.value,
      };
      
      this.cadastroService.postRM(rm).subscribe({
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
              mensagem: error.error.message
            }
          });
          console.error(error);
        }  
      });;
    }
    
  }

  detalhar(f:NgForm, rm:RequisicaoMudanca){
    this.eSiglaSistema.writeValue(rm.siglaSistema);
    this.eNumeroRtc.writeValue(rm.numeroRtc);
    this.eDataEntrega.writeValue(rm.dataEntregaString);
    this.eDataCrq.writeValue(rm.dataCrqString);
    this.eDataPrevista.writeValue(rm.dataPrevistaString);
    this.eDataImplantacao.writeValue(rm.dataImplantacaoString);
    this.eResumo.writeValue(rm.resumo);
    this.eDetalhe.nativeElement.value = rm.detalhe;
    this.id = rm.id;
    this.formValid();
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
    this.id = null;
    this.formValid();
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
