/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TableCrudComponent } from './table-crud.component';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';

describe('TableCrudComponent', () => {
  let component: TableCrudComponent;
  let fixture: ComponentFixture<TableCrudComponent>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      nome: 'Conta 1',
      descricao: 'Descrição 1',
      valor: 100,
      ativo: true,
      version: '1'
    },
    {
      id: 2,
      nome: 'Conta 2',
      descricao: 'Descrição 2',
      valor: 200,
      ativo: true,
      version: '1'
    }
  ];

  beforeEach(async () => {
    transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'getAllTransactions'
    ]);

    matDialogSpy = jasmine.createSpyObj('MatDialog', [
      'open'
    ]);

    transactionServiceSpy.getAllTransactions.and.returnValue(of(mockTransactions));

    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', [], {
      afterClosed: jasmine.createSpy('afterClosed').and.returnValue(of(null))
    });
    matDialogSpy.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      declarations: [TableCrudComponent],
      providers: [
        { provide: TransactionService, useValue: transactionServiceSpy },
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
      'description',
      'value',
      'edit',
      'read',
      'delete',
      'cash'
    ]);
  });

  describe('ngOnInit', () => {
    it('should call getAllTransactions on init', () => {
      component.ngOnInit();

      expect(transactionServiceSpy.getAllTransactions).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockTransactions);
    });
  });

  describe('getAllTransactions', () => {
    it('should call service and update dataSource', () => {
      component.getAllTransactions();

      expect(transactionServiceSpy.getAllTransactions).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockTransactions);
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

      component.openDialogChosen(mockTransactions[0], 'C');

      expect(component.openDialog).toHaveBeenCalledWith(mockTransactions[0], 'Consultar');
    });

    it('should call openDialog with dataUser and Editar for E', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockTransactions[0], 'E');

      expect(component.openDialog).toHaveBeenCalledWith(mockTransactions[0], 'Editar');
    });

    it('should call openDialog with dataUser and Deletar for D', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockTransactions[0], 'D');

      expect(component.openDialog).toHaveBeenCalledWith(mockTransactions[0], 'Deletar');
    });

    it('should call openDialog with dataUser and Transferência for T', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockTransactions[0], 'T');

      expect(component.openDialog).toHaveBeenCalledWith(mockTransactions[0], 'Transferência');
    });

    it('should not call openDialog for invalid code', () => {
      spyOn(component, 'openDialog');

      component.openDialogChosen(mockTransactions[0], 'X');

      expect(component.openDialog).not.toHaveBeenCalled();
    });
  });

  describe('openDialog', () => {
    it('should open dialog with correct data', () => {
      component.openDialog(mockTransactions[0], 'Editar');

      expect(matDialogSpy.open).toHaveBeenCalledWith(jasmine.any(Function), {
        data: { dataUser: mockTransactions[0], name: 'Editar' }
      });
    });

    it('should call getAllTransactions after dialog closes', () => {
      spyOn(component, 'getAllTransactions');

      component.openDialog(mockTransactions[0], 'Editar');

      expect(component.getAllTransactions).toHaveBeenCalled();
    });
  });
});

