import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string="https://localhost:44338/api/User/";
  constructor(private http: HttpClient,private router:Router) { }

  async Register(userObj:any){
    return await this.http.post<any>(`${this.url}register`,userObj);
  }

  async Login(loginObj:any){
    return await this.http.post<any>(`${this.url}login`,loginObj);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

}
