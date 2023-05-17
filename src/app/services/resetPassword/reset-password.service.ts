import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from 'src/app/models/resetPassword.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = "https://localhost:44338/api/ResetPassword";
  constructor(private http:HttpClient) { }

  sendResetPasswordLink(email:string){
    return this.http.post<any>(`${this.baseUrl}/send=reset-email/${email}`,{});
  }

  resetpassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`,resetPasswordObj);
  }
}
