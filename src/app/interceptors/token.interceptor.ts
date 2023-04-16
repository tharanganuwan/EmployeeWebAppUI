import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/authServices/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService,private tost : NgToastService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const myToken=this.auth.getToken();

    if(myToken){
      request = request.clone({
        setHeaders:{ Authorization: `Bearer ${myToken}`}
      })
    }

    // return next.handle(request).pipe(
    //   catchError((err:any)=>{
    //     if(err instanceof HttpResponse){
    //       if(err.status === 401){
    //         this.tost.warning({detail:"Warning", summary:"Token is expired, Login again"})
    //         this.router.navigate(['login']);

    //       }
    //     }
    //     return throwError(()=> new Error(err.error.message))
    //   })
    // );

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.tost.warning({ summary:'Warning', detail:'Token is expired, Login again'});
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
