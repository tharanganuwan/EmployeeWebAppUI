import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { CoreService } from 'src/app/services/core/core.service';
import { UserStoreService } from 'src/app/services/userStore/user-store.service';
import { ResetPasswordInputEmailFormComponent } from '../reset-password-input-email-form/reset-password-input-email-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(
    private _fb:FormBuilder,
    private _auth:AuthService,
    private _router:Router,
    private _coreService : CoreService,
    private _toast: NgToastService,
    private userStore: UserStoreService,
    private _dialog: MatDialog
    
    ){
    this.loginForm = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  
  loginForm!:FormGroup;
  hide = true;

  async onLogin(){
    if(this.loginForm.valid){
      (await this._auth.Login(this.loginForm.value))
      .subscribe({
        next:(res)=>{
          this._auth.storeToken(res.token);

          //get user detals and save userStore
          let tokenPayload = this._auth.decodedToken();
          this.userStore.setanameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);

          this._toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
          this.loginForm.reset();
          this._router.navigate(['dashboard']);
        },
        error:(err)=> {
          this._toast.error({detail:"ERROR",summary:err,duration:5000});
          // this._coreService.openSnackBar(err.error.message,"login fail");
        },
      })
    
    }else{
      // this._coreService.openSnackBar("not valied Inputs","login fail");
      this._toast.error({detail:"ERROR",summary:"not valied Inputs",duration:5000});
      
      console.log("not valied Inputs");

    }
  }

  cleckForgotPassword(){
    const formRef = this._dialog.open(ResetPasswordInputEmailFormComponent,);
  }

}
