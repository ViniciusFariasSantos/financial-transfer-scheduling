import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientRequest, ClientResponse } from 'src/app/model/client.model';
import { TransferRequest, TransferResponse } from 'src/app/model/tranfer.model';
import { ClientService } from 'src/app/service/client.service';
import { TransferService } from 'src/app/service/transfer.service';

  @Component({
    selector: 'app-dialog-crud',
    templateUrl: './dialog-crud.component.html',
  styleUrls: ['./dialog-crud.component.scss']
})
export class DialogCrudComponent implements OnInit {

  public user: ClientRequest = {      
    amount: 0,
    name: '',
    numberAccount: '',
  }; 
  public userData: ClientResponse = {
    id: 0,
    name: '',
    numberAccount: '',
    amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: '',
  }; 
  public transfer: TransferRequest = {
    clientOrigin: '',
    clientDestiny: '',
    amount: 0,
    dateScheduling: '',
  };
  booleanName: boolean = false;
  booleanTransfer: boolean = false;

  constructor ( 
      @Inject (MAT_DIALOG_DATA) public data: { dataUser: ClientResponse; name: string },
      private readonly transferService: TransferService,
      private readonly clientService:   ClientService,
      private readonly _snackBar: MatSnackBar,
    )
    {}
    ngOnInit(): void {
      if (this.data.name === 'Consultar' || this.data.name === 'Deletar') {
        this.booleanName = true;
      } else if (this.data.name ===   'Transferência') {
        this.booleanTransfer = true;
      }
      if(this.data.dataUser){
        this.userData = this.data.dataUser;
        this.transfer.clientDestiny = this.userData.numberAccount;
        this.transfer.amount = this.userData.amount;
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
    public editTransaction(): void {
      this.clientService.updateTransaction(this.user).subscribe( response => {
        this._snackBar.open('Transação atualizada com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }
    public deleteTransaction(): void {
      // this.clientService.deleteTransaction(this.user.id).subscribe( response => {
      //   this._snackBar.open('Transação excluída com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      // }, (error) => {
      //   this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      // });
    }
    public transferValue(): void {
      this.transferService.salvar(this.transfer).subscribe( response => {
        this._snackBar.open('Transferência realizada com sucesso!', 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      }, (error) => {
        this._snackBar.open(error.error.error, 'Fechar', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' });
      });
    }

}
