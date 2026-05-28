import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientRequest, ClientResponse } from 'src/app/model/client.model';
import { TransferRequest, TransferResponse } from 'src/app/model/tranfer.model';
import { ClientService } from 'src/app/service/client.service';
import { TransferService } from 'src/app/service/transfer.service';
import { FormatUtils } from 'src/app/utils/format-utils';

  @Component({
    selector: 'app-dialog-crud',
    templateUrl: './dialog-crud.component.html',
  styleUrls: ['./dialog-crud.component.scss']
})
export class DialogCrudComponent implements OnInit {
  public dataSource: TransferResponse[] = []; 
  displayedColumns: string[] = [
      'id',
      'clientOrigin',
      'clientDestiny',
      'nameTransfer',
      'amount',
      'tax',
      'dateTransfer',
      'dateScheduling',
    ];
  public user: ClientRequest = {      
    amount: 0,
    name: '',
    numberAccount: '',
  }; 
  public transfer: TransferRequest = {
    clientOrigin: '',
    clientDestiny: '',
    amount: 0,
    dateScheduling: '',
  };
  public userAmountMask: string = '';
  public transferAmountMask: string = '';
  public transferResponse: TransferResponse[] = [{
    clientOrigin: '',
    amount: 0,
    dateScheduling: '',
    dateTransfer: '',
    nameTransfer: '',
    id: 0,
    tax: 0, 
  }];
  booleanName: boolean = false;
  booleanTransfer: boolean = false;
  booleanExtract: boolean = false;

  constructor ( 
      @Inject (MAT_DIALOG_DATA) public data: { dataUser: ClientResponse; name: string },
      private readonly transferService: TransferService,
      private readonly clientService:   ClientService,
      private readonly _snackBar: MatSnackBar,
    )
    {}
    ngOnInit(): void {
      switch (this.data.name) {
        case 'Consultar':
        case 'Deletar':
          this.booleanName = true;
          break;
        case 'Transferência':
          this.booleanTransfer = true;
          break;
        case 'Extrato':
          this.booleanExtract = true;
          break;
        default:
          break;
      }

      if (this.data.dataUser) {
        this.user.numberAccount = this.data.dataUser.numberAccount;
        this.user.amount = this.data.dataUser.amount;
        this.userAmountMask = FormatUtils.numberToCurrencyBrl(this.user.amount);
        this.user.name = this.data.dataUser.name;
        this.transfer.clientOrigin = this.data.dataUser.numberAccount;
        this.transfer.amount = this.data.dataUser.amount;
        this.transferAmountMask = FormatUtils.numberToCurrencyBrl(this.transfer.amount);
        this.transferSearch();
      }
    }

    public clickButton(): void {
      switch (this.data.name) {
        case 'Adicionar':
          this.addTransaction();
          break;
        case 'Editar':
          this.editTransaction();
          break;
        case 'Deletar':
          this.deleteTransaction();
          break;
        case 'Transferência':
          this.transferValue();
          break;
      } 
    } 
    public addTransaction(): void {
      this.clientService.saveTransaction(this.user).subscribe( response => {
        this._snackBar.open('Transação adicionada com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }); 
    }

    public onUserAmountInput(value: string): void {
      this.userAmountMask = value;
      this.user.amount = FormatUtils.currencyBrlToNumber(value);
      this.userAmountMask = FormatUtils.numberToCurrencyBrl(this.user.amount);
    }

    public onTransferAmountInput(value: string): void {
      this.transferAmountMask = value;
      this.transfer.amount = FormatUtils.currencyBrlToNumber(value);
      this.transferAmountMask = FormatUtils.numberToCurrencyBrl(this.transfer.amount);
    }
    public editTransaction(): void {
      this.clientService.updateTransaction(this.data.dataUser.id, this.user).subscribe( response => {
        this._snackBar.open('Transação atualizada com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }
    public deleteTransaction(): void {
      this.clientService.deleteTransaction(this.data.dataUser.id).subscribe( response => {
        this._snackBar.open('Transação excluída com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }
    public transferValue(): void {
      // Criar uma cópia do objeto transfer para envio
      const transferToSend = { ...this.transfer };
      
      // Converter data para ISO format (yyyy-MM-dd) se estiver em formato brasileiro
      if (transferToSend.dateScheduling) {
        transferToSend.dateScheduling = FormatUtils.dateBrlToIso(transferToSend.dateScheduling);
      }
      
      this.transferService.salvar(transferToSend).subscribe( response => {
        this.transferSearch();
        this._snackBar.open('Transferência realizada com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }
    public transferSearch(): void {
      this.transferService.listar(this.transfer.clientOrigin).subscribe( response => {
        this.dataSource = response;
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }

    public onDateChange(event: any): void {
      // Converte o Date object do datepicker para ISO format string (yyyy-MM-dd)
      if (event && event.value) {
        const date = event.value as Date;
        const isoString = date.toISOString().split('T')[0]; // Pega apenas a data (yyyy-MM-dd)
        this.transfer.dateScheduling = isoString;
      }
    }

}
