import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

export interface RequisicaoMudanca {
    id?: number;
    numeroRtc: number;
    siglaSistema: string;
    resumo: string;
    dataEntregaString: string;
    dataCrqString: string
    dataPrevistaString: string;
    dataImplantacaoString: string
    detalhe: string;
}

@Injectable()
export class CadastroService {
    RMEndpoint = environment.APIEndpoint + "/rm";

    constructor(private http: HttpClient) { }

    list(): Observable<Array<RequisicaoMudanca>>{
      return this.http.get<Array<RequisicaoMudanca>>(this.RMEndpoint);
    }

    find(dataInicio:string, dataFim:string):  Observable<Array<RequisicaoMudanca>>{
      return this.http.get<Array<RequisicaoMudanca>>(this.RMEndpoint, {
        params: {
          dataInicio: dataInicio,
          dataFim: dataFim
        }
      });
    }

    excluir(rm: RequisicaoMudanca): Observable<any>{
      return this.http.delete(this.RMEndpoint + "/" + rm.id);
    }

    postRM(rm: RequisicaoMudanca): Observable<any>{
      return this.http.post(this.RMEndpoint, rm);
    }
}