import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransferService } from './service/transfer.service';
import { DialogCrudComponent } from './feature/dialog-crud/dialog-crud.component';
import { TableCrudComponent } from './feature/table-crud/table-crud.component';
import { BrlCurrencyPipe } from './pipe/brl-currency.pipe';
import { BrlDatePipe } from './pipe/brl-date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatTableModule} from  '@angular/material/table' ;
import {MatTooltipModule} from '@angular/material/tooltip';

import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    DialogCrudComponent,
    TableCrudComponent,
    BrlCurrencyPipe,
    BrlDatePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule, 
    MatIconModule,
    MatTooltipModule,
    MatButtonModule, 
    MatDialogModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    HttpClient,
    TransferService,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
