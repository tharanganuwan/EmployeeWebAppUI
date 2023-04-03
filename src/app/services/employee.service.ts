import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(data:Employee):Observable<any>{
    console.log(data.dateOfBirth);
    return this._http.post('https://localhost:44338/api/Employee',data)
  }

  getEmployee():Observable<any>{
    return this._http.get<Employee[]>('https://localhost:44338/api/Employee')
  }
}
