import { Injectable } from '@angular/core';
import { TransferRequest, TransferResponse } from '../model/tranfer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private api =
      'http://localhost:8080/transfer';

    constructor(
    private readonly http: HttpClient
    ) {}

    public salvar(dto: TransferRequest) : Observable<TransferResponse> {
      return this.http.post<TransferResponse>(this.api, dto);
    }

    public listar(param: string) : Observable<TransferResponse[]> {

      return this.http.get<TransferResponse[]>(
        `${this.api}/${param}`
      );
    }
}
