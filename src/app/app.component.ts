import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DatePipe} from '@angular/common'
import { Router } from '@angular/router';
import { CadastroService, RequisicaoMudanca} from "./cadastro/cadastro.service"
import { DialogMensagem } from './util/mensagem.component';
import {MatDialog} from '@angular/material/dialog';

declare function drawChartWithAngular(params:Array<Object>): void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  pipe = new DatePipe('pt-BR');
  router: Router;
  form:HTMLElement; 
  public isValid:boolean;
  rms: Array<RequisicaoMudanca> = [];
  isShowChart: boolean = true;

  constructor(private _router: Router, private cadastroService: CadastroService, public datepipe: DatePipe, public dialog: MatDialog){
    this.router = _router; 
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

  pushDataChart(rm: RequisicaoMudanca, dataInicio: string, dataFim: string, isResumo: boolean): Array<any>{
    let dataInicioDate = new Date(+dataInicio.split("-")[0], +dataInicio.split("-")[1], +dataInicio.split("-")[2], 0,0,0);
    let dataFimDate = new Date(+dataFim.split("-")[0], +dataFim.split("-")[1], +dataFim.split("-")[2], 0,0,0);
    let resumo = isResumo ? '' : rm.resumo;
    return [ rm.numeroRtc.toString(), resumo, this.createTooltip(rm.numeroRtc, rm.dataEntregaString, rm.dataCrqString,rm.dataPrevistaString, rm.dataImplantacaoString, rm.siglaSistema, rm.resumo, rm.detalhe), dataInicioDate, dataFimDate];
  }

  buscar(e: Event){
    var fieldDataInicio= document.getElementById('dataInicio'); 
    var fieldDataFim= document.getElementById('dataFim'); 
    var dataInicio= fieldDataInicio.getAttribute('value');
    var dataFim= fieldDataFim.getAttribute('value');
    this.find(dataInicio, dataFim);
  }

  find(dataInicio: string, dataFim: string){
    if(dataInicio && dataInicio != '' && dataFim && dataFim != ''){

      this.cadastroService.find(dataInicio, dataFim).subscribe({
        next: rms => {
          this.rms = rms;
          console.log("filtrado com sucesso");
          console.log(rms);
  
          if(rms.length == 0){
            this.isShowChart=false;
          }else{
            this.isShowChart=true;
            
            var massa = []
            var data = [];
            var dataCalendar = [];
    
            rms.map(rm => {
              let isResumo: boolean = false;
              if(rm.dataEntregaString && rm.dataEntregaString != ""){
                if(rm.dataCrqString && rm.dataCrqString != ""){
                  data.push(this.pushDataChart(rm, rm.dataEntregaString, rm.dataCrqString, isResumo));
                  isResumo = true;
                  if(rm.dataPrevistaString && rm.dataPrevistaString != ""){
                    data.push(this.pushDataChart(rm, rm.dataCrqString, rm.dataPrevistaString, isResumo));
                    isResumo = true;
                    if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                      data.push(this.pushDataChart(rm, rm.dataPrevistaString, rm.dataImplantacaoString, isResumo));
                      isResumo = true;
                    }
                  }
                }else if(rm.dataPrevistaString && rm.dataPrevistaString != ""){
                  data.push(this.pushDataChart(rm, rm.dataEntregaString, rm.dataPrevistaString, isResumo));
                  isResumo = true;
                  if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                    data.push(this.pushDataChart(rm, rm.dataPrevistaString, rm.dataImplantacaoString, isResumo));
                    isResumo = true;
                  }
                }else if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                  data.push(this.pushDataChart(rm, rm.dataEntregaString, rm.dataImplantacaoString, isResumo));
                  isResumo = true;
                }
                
              }else if(rm.dataCrqString && rm.dataCrqString != ""){
                if(rm.dataPrevistaString && rm.dataPrevistaString != ""){
                  data.push(this.pushDataChart(rm, rm.dataCrqString, rm.dataPrevistaString, isResumo));
                  isResumo = true;
                  if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                    data.push(this.pushDataChart(rm, rm.dataPrevistaString, rm.dataImplantacaoString, isResumo));
                    isResumo = true;
                  }
                }else if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                  data.push(this.pushDataChart(rm, rm.dataCrqString, rm.dataImplantacaoString, isResumo));
                  isResumo = true;
                }
              }else if(rm.dataPrevistaString && rm.dataPrevistaString != ""){
                if(rm.dataImplantacaoString && rm.dataImplantacaoString != ""){
                  data.push(this.pushDataChart(rm, rm.dataPrevistaString, rm.dataImplantacaoString, isResumo));
                  isResumo = true;
                }
              }
            });
        
            massa[0] = data;

            drawChartWithAngular(massa);
          }

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

  ngOnInit() {
    let dataInicio: string = this.datepipe.transform(new Date().setDate(new Date().getDate() - 30), 'yyyy-MM-dd');
    let dataFim: string = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.find(dataInicio, dataFim);
  }

  onSubmit(f:NgForm){
    
    if(this.isValid){
      console.log(f.value);
    }
    
  }

  createTooltip(id:number, dataEntregaFSW:string, dataGeracaoCRQ:string, dataPrevistaImplantacao:string, dataImplantacao:string, sistema:string, resumo:string, detalhe:string) : string {
    let dataEntregaFSWDate;
    let dataGeracaoCRQDate;
    let dataPrevistaImplantacaoDate;
    let dataImplantacaoDate;
    let dataEntregaFSWTooltip;
    let dataGeracaoCRQTooltip;
    let dataPrevistaImplantacaoTooltip;
    let dataImplantacaoTooltip;
    
    if(dataEntregaFSW && dataEntregaFSW != ""){
      dataEntregaFSWDate = new Date(dataEntregaFSW);
      dataEntregaFSWDate.setDate(dataEntregaFSWDate.getDate() + 1);
      dataEntregaFSWTooltip = this.pipe.transform(dataEntregaFSWDate, 'dd/MM/yyyy');
    }else{
      dataEntregaFSWTooltip = "";
    }
    if(dataGeracaoCRQ && dataGeracaoCRQ != ""){
      dataGeracaoCRQDate = new Date(dataGeracaoCRQ);
      dataGeracaoCRQDate.setDate(dataGeracaoCRQDate.getDate() + 1);
      dataGeracaoCRQTooltip = this.pipe.transform(dataGeracaoCRQDate, 'dd/MM/yyyy');
    }else{
      dataGeracaoCRQTooltip = "";
    }
    if(dataPrevistaImplantacao && dataPrevistaImplantacao != ""){
      dataPrevistaImplantacaoDate = new Date(dataPrevistaImplantacao);
      dataPrevistaImplantacaoDate.setDate(dataPrevistaImplantacaoDate.getDate() + 1);
      dataPrevistaImplantacaoTooltip = this.pipe.transform(dataPrevistaImplantacaoDate, 'dd/MM/yyyy');
    }else{
      dataPrevistaImplantacaoTooltip = "";
    }
    if(dataImplantacao && dataImplantacao != ""){
      dataImplantacaoDate = new Date(dataImplantacao);
      dataImplantacaoDate.setDate(dataImplantacaoDate.getDate() + 1);
      dataImplantacaoTooltip = this.pipe.transform(dataImplantacaoDate, 'dd/MM/yyyy');
    }else{
      dataImplantacaoTooltip = "";
    }

    return "<div class=\"tituloTooltip\">" + sistema + " - " + id + " - " + resumo + "</div>" + 
    "<br>" + 
    "<div>Data de entrega a RM: " + dataEntregaFSWTooltip + "</div>" +
    "<div>Data da geração da CRQ: " + dataGeracaoCRQTooltip + "</div>" +
    "<div>Data prevista de implantação: " + dataPrevistaImplantacaoTooltip + "</div>" +
    "<div>Data da implantação: " + dataImplantacaoTooltip + "</div>" +
    "<br>" +
    "<div>" + detalhe + "</div>"
    ;
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
}
