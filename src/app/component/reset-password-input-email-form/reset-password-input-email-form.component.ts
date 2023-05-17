import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';


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
    public dialogRef: MatDialogRef<ResetPasswordInputEmailFormComponent>,
    private resetService:ResetPasswordService
    ) {}

    checkValidEmail(event:string) {
      const value=event;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isvalidEmail = emailRegex.test(value);
      return this.isvalidEmail;
    }

  CancelClick() {
    this.dialogRef.close();
  }

  OkClick() {
    if (this.isvalidEmail) {
      console.log(this.resetPasswordEmail);
      this.resetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next:(res)=>{
          this.dialogRef.close();
          this._toast.success({detail:"Success",summary:"We sent email, check your email box",duration:5000});
          this.resetPasswordEmail="";
          this.dialogRef.close();
        },
        error:(err)=>{
          console.log(err.message);
          this._toast.error({detail:"ERROR",summary:err.message,duration:5000});
        }
      })
      
    }else{
      this._toast.error({detail:"ERROR",summary:"Invalid Email",duration:5000});
    }
  }

  
}
