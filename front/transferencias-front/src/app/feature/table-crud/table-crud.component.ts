import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrudComponent } from '../dialog-crud/dialog-crud.component';
import { ClientService } from 'src/app/service/client.service';
import { ClientResponse } from 'src/app/model/client.model';

const ELEMENT_DATA: ClientResponse[] = [
  {
    id: 1, name: 'Hydrogen', numberAccount: "1.0079", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 2, name: 'Helium', numberAccount: "4.0026", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 3, name: 'Lithium', numberAccount: "6.941", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 4, name: 'Beryllium', numberAccount: "9.0122", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 5, name: 'Boron', numberAccount: "10.811", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 6, name: 'Carbon', numberAccount: "12.0107", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 7, name: 'Nitrogen', numberAccount: "14.0067", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 8, name: 'Oxygen', numberAccount: "15.9994", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 9, name: 'Fluorine', numberAccount: "18.9984", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
  {
    id: 10, name: 'Neon', numberAccount: "20.1797", amount: 0,
    tax: '',
    dateTransfer: '',
    dateScheduling: ''
  },
];

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrls: ['./table-crud.component.scss']
})
export class TableCrudComponent implements OnInit {

   displayedColumns2: string[] = ['position', 'name', 'numberAccount', 'amount'];
  dataSource2 = ELEMENT_DATA;
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
      'transfer'
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

