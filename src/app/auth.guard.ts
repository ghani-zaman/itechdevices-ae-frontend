import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
@Injectable()
export class AuthGuard  {
  constructor(public auth: UserService, public router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!(await this.auth.isAuthenticated())) {
      // // console.log(state.url);
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }
}
