import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrudComponent } from '../dialog-crud/dialog-crud.component';
import { ClientService } from 'src/app/service/client.service';
import { ClientResponse } from 'src/app/model/client.model';


@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss']
})
export class TableCrudComponent implements OnInit {

  public dataSource: ClientResponse[] = []; 
  displayedColumns: string[] = [
      'id',
      'name',
      'numberAccount',
      'amount',
      'edit',
      'read',
      'delete',
      'cash',
      'extract'
    ];
  constructor(
    public readonly dialog: MatDialog,
    public readonly service: ClientService
  ) {}
  public ngOnInit(): void {
    this.getAllTransactions();
  }
  public getAllTransactions(): void {
    this.service.getAllTransactions().subscribe((response: ClientResponse[]) => {
      this.dataSource = response;
    });
  }
  public openDialogChosen(dataUser: ClientResponse | undefined, validateCrud: string ): void {
    switch (validateCrud) {
      case 'A':
        this.openDialog(undefined, 'Adicionar');
        break;
      case 'C':
        this.openDialog(dataUser,  'Consultar');
        break;
      case 'E':
        this.openDialog(dataUser, 'Editar');
        break;
      case 'D':
        this.openDialog(dataUser,  'Deletar');
        break;
      case 'T':
        this.openDialog(dataUser,  'Transferência');
        break;
      case 'X':
        this.openDialog(dataUser,  'Extrato');
        break;
      default:
        break;
    }
    
  }
  public openDialog(dataUser: ClientResponse | undefined, validateCrud: string): void {
    const dialogRef = this.dialog.open(DialogCrudComponent, {
      data: { dataUser: dataUser, name: validateCrud },
    }); 

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTransactions();
    });
  }
}

