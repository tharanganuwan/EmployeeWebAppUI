import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ComfirmPasswordValidater } from 'src/app/helpers/confirm-password.validator';
import { ResetPassword } from 'src/app/models/resetPassword.model';
import { ResetPasswordService } from 'src/app/services/resetPassword/reset-password.service';



@Component({
  selector: 'app-reset-password-edit-form',
  templateUrl: './reset-password-edit-form.component.html',
  styleUrls: ['./reset-password-edit-form.component.css']
})
export class ResetPasswordEditFormComponent implements OnInit{

  resetForm!:FormGroup;
  hide = true;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj:ResetPassword = new ResetPassword();

  constructor(
    private _fb:FormBuilder,
    private activatedRoute : ActivatedRoute,
    private _toast: NgToastService,
    private _resetService:ResetPasswordService,
    private router:Router,
    ){
    this.resetForm = this._fb.group({
      npassword: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    },
    {
      validator:ComfirmPasswordValidater("npassword","cpassword")
    }
    )
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      this.emailToken = val['code'].replace(/ /g,'+'); // remove spaces
    })
  }

  reset(){
    if(this.resetForm.valid){
      this.resetPasswordObj.email=this.emailToReset;
      this.resetPasswordObj.newPassword=this.resetForm.get('npassword')?.value;
      this.resetPasswordObj.confirmPassword=this.resetForm.value.cpassword; // two ways access controller
      this.resetPasswordObj.emailToken=this.emailToken;
      
      this._resetService.resetpassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this._toast.success({detail:"SUCCESS",summary:"Password Reset Successfully",duration:5000});
          this.router.navigate(['/'])
        },
        error:(err)=>{
          this._toast.error({detail:"ERROR",summary:err,duration:5000});
        }
      })

    }else{
      this._toast.error({detail:"ERROR",summary:"Please Try Again",duration:5000});
    }
  }

  onSubmit(){
    this.reset();
  }

  
}
