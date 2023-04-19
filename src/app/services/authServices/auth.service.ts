import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string="https://localhost:44338/api/User/";
  private userPayload:any;
  constructor(private http: HttpClient,private router:Router) {
    this.userPayload = this.decodedToken();
    
   }

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




  decodedToken(){
    const jtwHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jtwHelper.decodeToken(token);
  }

  getnamefromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }
  getRolefromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

}
