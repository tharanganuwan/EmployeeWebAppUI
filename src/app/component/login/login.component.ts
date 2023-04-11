import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { CoreService } from 'src/app/services/core/core.service';


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
    private _toast: NgToastService
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
          this._toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
          this.loginForm.reset();
          this._router.navigate(['dashboard']);
        },
        error:(err)=> {
          this._toast.error({detail:"ERROR",summary:err.error.message,duration:5000});
          // this._coreService.openSnackBar(err.error.message,"login fail");
          console.log(err.error.message);
        },
      })
    
    }else{
      // this._coreService.openSnackBar("not valied Inputs","login fail");
      this._toast.error({detail:"ERROR",summary:"not valied Inputs",duration:5000});
      
      console.log("not valied Inputs");

    }
  }


}
