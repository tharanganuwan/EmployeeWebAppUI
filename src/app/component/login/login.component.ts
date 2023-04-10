import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
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
    private _coreService : CoreService
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
          this._coreService.openSnackBar(res.message,"done");
          this.loginForm.reset();
          this._router.navigate(['dashboard']);
        },
        error:(err)=> {
          this._coreService.openSnackBar("login fail","clear");
        },
      })
    
    }else{
      console.log("not valied");
      alert("not valied");
    }
  }


}
