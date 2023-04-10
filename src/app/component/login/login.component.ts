import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    
  }

  constructor(private _fb:FormBuilder){
    this.loginForm = this._fb.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  
  loginForm!:FormGroup;
  hide = true;

  onsubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    
    }else{
      console.log("not valied");
      alert("not valied");
    }
  }


}
