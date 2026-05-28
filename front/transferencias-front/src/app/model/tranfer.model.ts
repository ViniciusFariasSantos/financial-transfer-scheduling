export interface TransferRequest {
    clientOrigin: string,
    clientDestiny: string,
    amount: number,
    dateScheduling: string,
  }
export interface TransferResponse {
  id: number,
  clientOrigin: string,
  nameTransfer: string,
  amount:number,
  tax: number,
  dateTransfer: string,
  dateScheduling: string,
  }