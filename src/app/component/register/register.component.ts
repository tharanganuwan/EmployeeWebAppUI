import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private _fb:FormBuilder,
    private _auth:AuthService,
    private _router:Router,
    private _coreService : CoreService,
    private _toast: NgToastService
    
    ){
    this.registrationForm = this._fb.group({
      userName:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role:['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    
  }
  hide = true;
  genderValues: { label: string}[] = [
    { label: 'Admin' },
    { label: 'User' },
    { label: 'Other' }
  ];

  registrationForm!:FormGroup;

  async onRegister(){
    if(this.registrationForm.valid){
      (await this._auth.Register(this.registrationForm.value))
      .subscribe({
        next:(res)=>{
          // this._coreService.openSnackBar(res.message,"done");
          this._toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
          this.registrationForm.reset();
          this._router.navigate(['login']);
        },
        error:(err)=> {
          this._toast.error({detail:"Registraion fail",summary:err,duration:5000});
          // this._coreService.openSnackBar(err.error.message,"Registraion fail",);
        },
      })
    }else{
      console.log("not valied");
      // this._coreService.openSnackBar("not valied Inputs","login fail");
      this._toast.error({detail:"Registraion fail",summary:"not valied Inputs",duration:5000});
    }
  }
}
