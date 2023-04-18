import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core/core.service';


@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.css']
})
export class AddEditFormComponent implements OnInit{
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
    if(this.data != null){
      const parts =this.data.name.split(" ");
    this.empForm.patchValue({
      firstName: parts[0],
      middleName: parts[1],
      lastName : parts[2]
    })
    }
    
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
    private _dialogRef:MatDialogRef<AddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Employee,
    private _coreService : CoreService
  ){
    this.empForm = this._fb.group({
      firstName:'',
      middleName:'',
      lastName:'',
      email:['', [Validators.required, Validators.email]],
      dateOfBirth:['',[Validators.required,]],
      company:'',
      gender:'',
      salary:''
    })
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.employeeId,this.empForm.value).subscribe({
          next :(val:any) =>{
            this._coreService.openSnackBar("employee update success!","done");
            this._dialogRef.close(true);
          },error(err) {
            console.log(err);
          },
        })
      }else{
        this._empService.addEmployee(<Employee>this.empForm.value).subscribe({
          next:(val:any) =>{
            this._coreService.openSnackBar("employee added success!","done");
            this._dialogRef.close(true);
            window.location.reload();
          },error(err) {
            console.log(err)
          },
        })
      }
      
    }
  }
}
