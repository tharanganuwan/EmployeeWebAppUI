import { Component, OnInit,ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employeeService/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core/core.service';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit{

  displayedColumns: string[] = 
  [
    'employeeId',
    'name',
    'email',
    'dateOfBirth',
    'gender',
    'company',
    'salary',
    'action'
  
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public role!:string;

  constructor(
    private _empService: EmployeeService,
    private _dialog: MatDialog,
    private _coreService : CoreService,
    private _header:HeaderComponent
    ){}

  ngOnInit(): void {
    this.getAllEmployee();
    this.role=this._header.role;
  }

  getAllEmployee(){
    this._empService.getEmployee().subscribe({
      next : (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error(err) {
        console.log(err);
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(val)=>{
        this._coreService.openSnackBar("employee Delete success!","done");
        this.getAllEmployee();
      },
      error(err) {
        console.log(err);
      },
    })
  }

  openForm(datas:any){
    const formRef = this._dialog.open(AddEditFormComponent,{data:datas});
    formRef.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this.getAllEmployee();
        }
      }
    })
  }

  
}
