import { Component,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { AuthService } from 'src/app/services/authServices/auth.service';
// import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // @ViewChild(EmployeeTableComponent,{static:false}) componet!: EmployeeTableComponent;

  constructor(private _dialog: MatDialog,private auth:AuthService){}

  openForm(){
    const formRef = this._dialog.open(AddEditFormComponent);
    // formRef.afterClosed().subscribe({
    //   next:(val)=>{
    //     if (val){
    //       console.log("######################");
    //       this.componet.getAllEmployee();
    //     }
    //   }
    // })
  }
  logOut(){
    this.auth.logOut();
  }
}
