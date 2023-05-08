import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-reset-password-input-email-form',
  templateUrl: './reset-password-input-email-form.component.html',
  styleUrls: ['./reset-password-input-email-form.component.css']
})
export class ResetPasswordInputEmailFormComponent {

  public resetPasswordEmail: string = '';
  public isvalidEmail: boolean =false;

  constructor(
    private _toast: NgToastService,
    public dialogRef: MatDialogRef<ResetPasswordInputEmailFormComponent>
    ) {}

  CancelClick() {
    this.dialogRef.close();
  }

  OkClick() {
    if (this.isvalidEmail) {
      console.log(this.resetPasswordEmail);
      this._toast.success({detail:"Success",summary:"We sent email, check your email box",duration:5000});
      this.dialogRef.close();
    }else{
      this._toast.error({detail:"ERROR",summary:"Invalid Email",duration:5000});
    }
  }

  checkValidEmail(event:string) {
    const value=event;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isvalidEmail = emailRegex.test(value);
    return this.isvalidEmail;
  }
}
