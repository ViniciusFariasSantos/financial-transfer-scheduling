/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TableCrudComponent } from './table-crud.component';
import { ClientService } from 'src/app/service/client.service';
import { ClientResponse } from 'src/app/model/client.model';

describe('TableCrudComponent', () => {
  let component: TableCrudComponent;
  let fixture: ComponentFixture<TableCrudComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockClients: ClientResponse[] = [
    {
      id: 1,
      name: 'Conta 1',
      numberAccount: '111',
      amount: 100,
      tax: '0',
      dateTransfer: '2026-04-01',
      dateScheduling: '2026-04-10'
    },
    {
      id: 2,
      name: 'Conta 2',
      numberAccount: '222',
      amount: 200,
      tax: '0',
      dateTransfer: '2026-04-02',
      dateScheduling: '2026-04-11'
    }
  ];

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getAllTransactions'
    ]);

    matDialogSpy = jasmine.createSpyObj('MatDialog', [
      'open'
    ]);

    clientServiceSpy.getAllTransactions.and.returnValue(of(mockClients));

    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', [], {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(null))
    });
    matDialogSpy.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      declarations: [TableCrudComponent],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCrudComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumns', () => {
    expect(component.displayedColumns).toEqual([
      'id',
      'name',
      'numberAccount',
      'amount',
      'edit',
      'read',
      'delete',
      'cash',
      'extract'
    ]);
  });

  describe('ngOnInit', () => {
    it('should call getAllTransactions on init', () => {
      component.ngOnInit();

      expect(clientServiceSpy.getAllTransactions).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockClients);
    });
  });

  describe('getAllTransactions', () => {
    it('should call service and update dataSource', () => {
      component.getAllTransactions();

      expect(clientServiceSpy.getAllTransactions).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockClients);
    });
  });

  describe('openDialogChosen', () => {
    it('should call openDialog with undefined and Adicionar for A', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(undefined, 'A');

      expect(component.openDialog).toHaveBeenCalledWith(undefined, 'Adicionar');
    });

    it('should call openDialog with dataUser and Consultar for C', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockClients[0], 'C');

      expect(component.openDialog).toHaveBeenCalledWith(mockClients[0], 'Consultar');
    });

    it('should call openDialog with dataUser and Editar for E', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockClients[0], 'E');

      expect(component.openDialog).toHaveBeenCalledWith(mockClients[0], 'Editar');
    });

    it('should call openDialog with dataUser and Deletar for D', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockClients[0], 'D');

      expect(component.openDialog).toHaveBeenCalledWith(mockClients[0], 'Deletar');
    });

    it('should call openDialog with dataUser and Transferência for T', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockClients[0], 'T');

      expect(component.openDialog).toHaveBeenCalledWith(mockClients[0], 'Transferência');
    });

    it('should not call openDialog for invalid code', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockClients[0], 'Z');

      expect(component.openDialog).not.toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('should open dialog with correct data', () => {
      component.openDialog(mockClients[0], 'Editar');

      expect(matDialogSpy.open).toHaveBeenCalledWith(jasmine.any(Function), {
        data: { dataUser: mockClients[0], name: 'Editar' }
      });
    });

    it('should call getAllTransactions after dialog closes', () => {
      spyOn(component, 'getAllTransactions');

      component.openDialog(mockClients[0], 'Editar');

      expect(component.getAllTransactions).toHaveBeenCalled();
    });
  });
});

