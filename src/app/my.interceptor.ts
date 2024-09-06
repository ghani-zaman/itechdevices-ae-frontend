import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  isBrowser = false;
  constructor(public toasterService: ToastrService, @Inject(PLATFORM_ID) private platformId, private router: Router) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloned = req;
    //console.log(req.url);
    //console.log(new Date())
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser){
      const idToken = localStorage.getItem('token');
      if (idToken) {
        const tokenjson = idToken;
        cloned = req.clone({
          headers: req.headers.set('Authorization',
            'Bearer ' + tokenjson),
        });
      }
      // tslint:disable-next-line:variable-name
      const sessiontoken = localStorage.getItem('sessiontoken');
      if (sessiontoken) {
        const stokenjson = sessiontoken;
        cloned = cloned.clone({
          headers: req.headers.set('sessiontoken',
            stokenjson),
        });
      }

      if (idToken && sessiontoken) {
        const tokenjsonx = idToken;
        const stokenjsonx = sessiontoken;
        const headers = new HttpHeaders({
          Authorization: 'Bearer ' + tokenjsonx,
          sessiontoken:  stokenjsonx,
        });
        cloned = cloned.clone({headers});
      }
    }
    /*cloned = cloned.clone({
    withCredentials: true,
    });*/
    return next.handle(cloned).pipe(
      tap(evt => {


          if (evt instanceof HttpResponse) {
            //console.log(new Date());
              if (evt.body && evt.body.success) {

              }
          }
      }),
      catchError((err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.toasterService.error('Not Found', '' , { positionClass: 'toast-bottom-right' });
            return throwError(err);
          }
          if (err.status === 401) {
            this.toasterService.error('Unauthorized Access', '' , { positionClass: 'toast-bottom-right' });
            return throwError(err);
          }
          if (err.status === 402) {
            this.toasterService.error('Invalid username or password', '' , { positionClass: 'toast-bottom-right' });
            return throwError(err);
          }

          if (err.status === 400) {
            if (err.error.message) {
              this.toasterService.error(err.error.message, '' , { positionClass: 'toast-bottom-right' });
            }
            else if (err.error.data) {
              this.toasterService.error(err.error.data, '' , { positionClass: 'toast-bottom-right' });
            }
          }

          if (err.status === 460) {
            if(err.error.data.errors){
            const fkey = Object.keys(err.error.data.errors)[0];
            this.toasterService.error(err.error.data.errors[fkey], '' , { positionClass: 'toast-bottom-right' });
            } else {
              this.toasterService.error(err.error.data.approval_message, '' , { positionClass: 'toast-bottom-right' });
            }
          }

          if (err.status === 461) {
            // this.router.navigate(['/errors/not-found.html']);
          }
          if (err.status === 499) {
            this.router.navigate(['/errors/redirect.html'], {skipLocationChange: true, queryParams:{redirected:err.error.data.new_url, old:err.error.data.new_url }});
          }
          if (err.status === 498) {
            this.router.navigate([err.error.data.new_url]);
          }

          if (err.status === 462) {
            // console.log(err);
            this.router.navigate([err.error.data.redirect_url]);
          }
          if (err.status === 500) {
            this.toasterService.error(err.error.message, '' , { positionClass: 'toast-bottom-right' });
          }
             /* try {
                  this.toasterService.error(err.error.message, '' , { positionClass: 'toast-bottom-center' });
              } catch (e) {
                  this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
              }*/
          }
        return throwError(err);
      })) as Observable<HttpEvent<any>>;
  }
}
