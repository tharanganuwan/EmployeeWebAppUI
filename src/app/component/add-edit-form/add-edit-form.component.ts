import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit{
  ngOnInit(): void {
    
  }
  
  genderValues: { label: string, value: number }[] = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
    { label: 'Other', value: 2 }
  ];
  empForm : FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _empService: EmployeeService,
    private datePipe: DatePipe
  ){
    this.empForm = this._fb.group({
      firstName:'',
      middleName:'',
      lastName:'',
      email:'',
      dateOfBirth:'',
      company:'',
      gender:'',
      salary:''
    })
  }
  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(<Employee>this.empForm.value).subscribe({
        next:(val:any) =>{
          console.log(val);
          
        },error(err) {
          console.log(err)
        },
      })
    }
  }
  formatDate(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }
}
