import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _fb:FormBuilder){
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

  onsubmit(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm.value);
    
    }else{
      console.log("not valied");
      alert("not valied");
    }
  }
}
