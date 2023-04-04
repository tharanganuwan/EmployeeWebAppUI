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
    return this._http.post('https://localhost:44338/api/Employee',data)
  }

  getEmployee():Observable<any>{
    return this._http.get<Employee[]>('https://localhost:44338/api/Employee')
  }

  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`https://localhost:44338/api/Employee/${id}`);
  }

  updateEmployee(id:string,data:Employee):Observable<any>{
    return this._http.put(`https://localhost:44338/api/Employee/${id}`,data)
  }
}
