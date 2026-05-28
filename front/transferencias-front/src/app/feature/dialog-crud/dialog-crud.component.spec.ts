/// <reference types="jasmine" />

import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrudComponent } from './dialog-crud.component';
import { ClientService } from 'src/app/service/client.service';
import { TransferService } from 'src/app/service/transfer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientRequest, ClientResponse } from 'src/app/model/client.model';
import { TransferRequest, TransferResponse } from 'src/app/model/tranfer.model';
import { BrlCurrencyPipe } from 'src/app/pipe/brl-currency.pipe';
import { BrlDatePipe } from 'src/app/pipe/brl-date.pipe';

describe('DialogCrudComponent', () => {
  let component: DialogCrudComponent;
  let fixture: ComponentFixture<DialogCrudComponent>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let transferServiceSpy: jasmine.SpyObj<TransferService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const defaultData = {
    dataUser: {
      id: 1,
      name: 'Teste',
      numberAccount: '12345',
      amount: 100,
      tax: '0',
      dateTransfer: '2026-04-01',
      dateScheduling: '2026-04-10'
    } as ClientResponse,
    name: 'Consultar'
  };

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'saveTransaction',
      'updateTransaction',
      'deleteTransaction',
      'getAllTransactions'
    ]);

    transferServiceSpy = jasmine.createSpyObj('TransferService', [
      'salvar',
      'listar'
    ]);

    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    clientServiceSpy.saveTransaction.and.returnValue(of(defaultData.dataUser));
    clientServiceSpy.updateTransaction.and.returnValue(of(defaultData.dataUser));
    clientServiceSpy.deleteTransaction.and.returnValue(of(void 0));
    transferServiceSpy.salvar.and.returnValue(of({} as TransferResponse));
    transferServiceSpy.listar.and.returnValue(of([] as TransferResponse[]));

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [DialogCrudComponent, BrlCurrencyPipe, BrlDatePipe],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: defaultData },
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: TransferService, useValue: transferServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
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
    component.data.name = 'Transferência';
    component.ngOnInit();

    expect(component.booleanTransfer).toBeTrue();
    expect(component.booleanName).toBeFalse();
  });

  it('should initialize user and transfer from dataUser', () => {
    component.data.dataUser = defaultData.dataUser;
    component.ngOnInit();

    expect(component.user.numberAccount).toBe(defaultData.dataUser.numberAccount);
    expect(component.user.amount).toBe(defaultData.dataUser.amount);
    expect(component.transfer.clientOrigin).toBe(defaultData.dataUser.numberAccount);
    expect(component.transfer.amount).toBe(defaultData.dataUser.amount);
  });

  describe('clickButton', () => {
    it('should call saveTransaction for Adicionar', () => {
      component.data.name = 'Adicionar';
      component.clickButton();

      expect(clientServiceSpy.saveTransaction).toHaveBeenCalledWith(component.user);
    });

    it('should call updateTransaction for Editar', () => {
      component.data.name = 'Editar';
      component.data.dataUser = defaultData.dataUser;
      component.clickButton();

      expect(clientServiceSpy.updateTransaction).toHaveBeenCalledWith(defaultData.dataUser.id, component.user);
    });

    it('should call deleteTransaction for Deletar', () => {
      component.data.name = 'Deletar';
      component.data.dataUser = defaultData.dataUser;
      component.clickButton();

      expect(clientServiceSpy.deleteTransaction).toHaveBeenCalledWith(defaultData.dataUser.id);
    });

    it('should call transferService.salvar for Transferência', () => {
      component.data.name = 'Transferência';
      component.clickButton();

      expect(transferServiceSpy.salvar).toHaveBeenCalledWith(jasmine.objectContaining({ clientOrigin: component.transfer.clientOrigin }));
    });
  });
});
