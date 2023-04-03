import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  genderValues:string[]=[
    'Male',
    'Female',
    'Other'
  ]
  empForm : FormGroup;

  constructor(
    private _fb:FormBuilder,
  ){
    this.empForm = this._fb.group({
      firstName:'',
      middleName:'',
      lastName:'',
      email:'',
      dob:'',
      company:'',
      gender:'',
      salary:''
    })
  }
  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
    }
  }
}
