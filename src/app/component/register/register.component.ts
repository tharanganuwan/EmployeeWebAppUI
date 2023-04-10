import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
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
    private _coreService : CoreService
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

  registrationForm!:FormGroup;

  async onRegister(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
      (await this._auth.Register(this.registrationForm.value))
      .subscribe({
        next:(res)=>{
          this._coreService.openSnackBar(res.message,"done");
          this.registrationForm.reset();
          this._router.navigate(['login']);
        },
        error:(err)=> {
          this._coreService.openSnackBar("Registraion fail","clear");
        },
      })
    }else{
      console.log("not valied");
      alert("not valied");
    }
  }
}
