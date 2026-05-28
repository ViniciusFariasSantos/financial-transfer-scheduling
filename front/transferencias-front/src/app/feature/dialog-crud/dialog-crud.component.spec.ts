/// <reference types="jasmine" />

import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudComponent } from './dialog-crud.component';
import { TransactionService } from '../service/transaction.service';
import { Transaction } from '../model/transaction.model';
import { Transfer } from '../model/transfer.model';

describe('DialogCrudComponent', () => {
  let component: DialogCrudComponent;
  let fixture: ComponentFixture<DialogCrudComponent>;
  let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

  const defaultData = {
    dataUser: {
      id: 1,
      nome: 'Teste',
      descricao: 'Descrição teste',
      valor: 100,
      ativo: true,
      version: '1'
    } as Transaction,
    name: 'Consultar'
  };

  beforeEach(async () => {
    transactionServiceSpy = jasmine.createSpyObj('TransactionService', [
      'saveTransaction',
      'updateTransaction',
      'deleteTransaction',
      'transferValue'
    ]);

    transactionServiceSpy.saveTransaction.and.returnValue(of(defaultData.dataUser));
    transactionServiceSpy.updateTransaction.and.returnValue(of(defaultData.dataUser));
    transactionServiceSpy.deleteTransaction.and.returnValue(of(void 0));
    transactionServiceSpy.transferValue.and.returnValue(of({ fromId: 0, toId: 0, amount: 0 } as Transfer));

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DialogCrudComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: defaultData },
        { provide: TransactionService, useValue: transactionServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set booleanName when name is Consultar', () => {
    component.data.name = 'Consultar';
    component.ngOnInit();

    expect(component.booleanName).toBeTrue();
    expect(component.booleanTransfer).toBeFalse();
  });

  it('should set booleanTransfer when name is Transferência', () => {
    // Create a fresh component instance for this test
    const freshComponent = new DialogCrudComponent(defaultData, transactionServiceSpy);
    freshComponent.data.name = 'Transferência';
    freshComponent.ngOnInit();

    expect(freshComponent.booleanTransfer).toBeTrue();
    expect(freshComponent.booleanName).toBeFalse();
  });

  it('should initialize user and transfer from dataUser', () => {
    component.data.name = 'Consultar';
    component.data.dataUser = defaultData.dataUser;
    component.ngOnInit();

    expect(component.user).toEqual(defaultData.dataUser);
    expect(component.transfer.toId).toBe(defaultData.dataUser.id);
    expect(component.transfer.amount).toBe(defaultData.dataUser.valor);
  });

  describe('clickButton', () => {
    it('should call saveTransaction for Adicionar', () => {
      component.data.name = 'Adicionar';
      component.clickButton();

      expect(transactionServiceSpy.saveTransaction).toHaveBeenCalledWith(component.user);
    });

    it('should call updateTransaction for Editar', () => {
      component.data.name = 'Editar';
      component.clickButton();

      expect(transactionServiceSpy.updateTransaction).toHaveBeenCalledWith(component.user);
    });

    it('should call deleteTransaction for Deletar', () => {
      component.data.name = 'Deletar';
      component.clickButton();

      expect(transactionServiceSpy.deleteTransaction).toHaveBeenCalledWith(component.user.id);
    });

    it('should call transferValue for Transferência', () => {
      component.data.name = 'Transferência';
      component.clickButton();

      expect(transactionServiceSpy.transferValue).toHaveBeenCalledWith(component.transfer);
    });
  });
});
