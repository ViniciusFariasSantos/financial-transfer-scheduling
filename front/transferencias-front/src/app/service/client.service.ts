import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRequest, ClientResponse } from '../model/client.model';
import { environment } from '../assest/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private api =
      'http://localhost:8080/cliente';

      // private api =`${environment.apiUrl}/cliente`;
  constructor(
    private readonly http: HttpClient
  ) {}

  public getAllTransactions() : Observable<ClientResponse[]>   {
    return this.http.get<ClientResponse[]>(this.api);
  }
  public saveTransaction(transaction: ClientRequest) : Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.api, transaction);
  }

  public updateTransaction(transaction: ClientRequest) : Observable<ClientResponse> {
    return this.http.put<ClientResponse>(`${this.api}/${transaction.numberAccount }`, transaction);
  }

  public deleteTransaction(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
