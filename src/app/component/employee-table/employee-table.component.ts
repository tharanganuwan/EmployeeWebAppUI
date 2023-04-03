import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {

  constructor(private _empService: EmployeeService){}

  getAllEmployee(){
    this._empService.getEmployee()
    .subscribe(
      res => {
        console.log(res);
      }
    )
  }
}
