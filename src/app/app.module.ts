import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './component/header/header.component';
import { AddEditFormComponent } from './component/add-edit-form/add-edit-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeTableComponent } from './component/employee-table/employee-table.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {MatCardModule} from '@angular/material/card';
import { NgToastModule } from 'ng-angular-popup'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetPasswordInputEmailFormComponent } from './component/reset-password-input-email-form/reset-password-input-email-form.component';
import { ResetPasswordEditFormComponent } from './component/reset-password-edit-form/reset-password-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddEditFormComponent,
    EmployeeTableComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordInputEmailFormComponent,
    ResetPasswordEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    NgToastModule,
    FormsModule,
  ],
  providers: [
    EmployeeTableComponent,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
