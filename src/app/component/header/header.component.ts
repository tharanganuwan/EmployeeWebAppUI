import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { AuthService } from 'src/app/services/authServices/auth.service';
import { UserStoreService } from 'src/app/services/userStore/user-store.service';
// import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ViewChild(EmployeeTableComponent,{static:false}) componet!: EmployeeTableComponent;

  public name:string = "";
  public role!:string; 


  constructor(private _dialog: MatDialog,private auth:AuthService,private userStore:UserStoreService){}

  ngOnInit(){
    this.userStore.getNameFromStore()
      .subscribe(val=>{
        let nameFromToken = this.auth.getnamefromToken();
        this.name = val || nameFromToken;
      });

    this.userStore.getRoleFromStore()
      .subscribe(val=>{
        let roleFromToken = this.auth.getRolefromToken();
        this.role = val || roleFromToken;
      });

  }

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
