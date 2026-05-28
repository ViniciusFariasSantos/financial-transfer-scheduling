export interface ClientRequest {
    name: string,
    numberAccount: string,
    amount: number
}

export interface ClientResponse {
    id: number,
    name: string,
    numberAccount: string,
    amount: number,
    tax: string,
    dateTransfer: string,
    dateScheduling: string
}