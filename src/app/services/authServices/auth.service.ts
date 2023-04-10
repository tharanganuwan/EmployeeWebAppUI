import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string="https://localhost:44338/api/User/";
  constructor(private http: HttpClient) { }

  async Register(userObj:any){
    return await this.http.post<any>(`${this.url}register`,userObj);
  }

  async Login(loginObj:any){
    return await this.http.post<any>(`${this.url}login`,loginObj);
  }
}
