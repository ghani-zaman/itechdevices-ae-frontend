import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyToastService } from './my-toast.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseEndpoint: string;
  loginFlag = new Subject<boolean>();
  updateFlag = new BehaviorSubject<number>(0);
  updateFlag$ = this.updateFlag.asObservable();
  loginFlag$ = this.loginFlag.asObservable();
  private user = signal({});
  public currentUser = this.user.asReadonly();
  isBrowser = false;
  constructor(
    private http: HttpClient,
    private toast: MyToastService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.loginFlag.next(false);
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.baseEndpoint = environment.apiUrl + environment.webId;
  }
  updateUserInfo(data: any) {
    this.user.update(value => value = data)

  }
  async getUser(): Promise<any> {
    const list: any  = await this.http.get(this.baseEndpoint + '/customer').toPromise();
    this.updateUserInfo(list.data);
    return list.data;
  }

  async isAuthenticated(): Promise<boolean> {
    if(this.isBrowser){
      try {
        const user = localStorage.getItem('token')? localStorage.getItem('token') : null;
        if (user == null) {
          return false;
        }else {
          return true;
        }
      } catch (err) {
        return false;
      }
    }
  }

  isEmailTaken(email, update = false) : Observable<any> {
    if(update) {
      return this.http.post(this.baseEndpoint + '/customer/check/user', {email});
    }
    return this.http.post(this.baseEndpoint + '/customer/check', {email});
  }

  async login(data): Promise<any> {
    try {
      const user: any = await this.http.post(this.baseEndpoint + '/customer/login', data).toPromise();
      if (user) {
        localStorage.setItem('token', user.data.token);
        this.loginFlag.next(true);
        this.updateFlag.next(0);
        this.updateUserInfo(user.data);
        return user;
      }else {
        this.loginFlag.next(false);
        return false;
      }
    } catch (err) {
      this.loginFlag.next(false);
      return false;
    }
  }
  async registerBusiness(data): Promise<boolean> {
    try {
      const user: any = await this.http.post(this.baseEndpoint + '/customer/register/business', data).toPromise();
      if (user) {
        // localStorage.setItem('token', user.data.token);
        // this.loginFlag.next(true);
        return true;
      }else {
        // this.loginFlag.next(false);
        return false;
      }
    } catch (err) {
      this.loginFlag.next(false);
      return false;
    }
  }
  async registerCustomer(data): Promise<boolean> {
    try {
      const user: any = await this.http.post(this.baseEndpoint + '/customer/register', data).toPromise();
      if (user) {
        // localStorage.setItem('token', user.data.token);
        // this.loginFlag.next(true);
        return true;
      }else {
        // this.loginFlag.next(false);
        return false;
      }
    } catch (err) {
      this.loginFlag.next(false);
      return false;
    }
  }
  async logout(): Promise<boolean> {
    try {
      const user: any = await this.http.get(this.baseEndpoint + '/customer/logout').toPromise();
      if (user) {
        localStorage.removeItem('token');
        this.loginFlag.next(false);
        this.updateFlag.next(0);
        this.updateUserInfo({});
        this.toast.success('Logged out successfully.');
        return true;
      }else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async saveUserAddress(data): Promise<any> {
    try {
      const address: any = await this.http.post(this.baseEndpoint + '/customer/save-address-information', data).toPromise();
      if (address) {
        let updateCount = this.updateFlag.getValue();
        this.updateFlag.next(++updateCount);
        return address.data;

      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async updateUser(data): Promise<any> {
    try {
      const resp: any = await this.http.post(this.baseEndpoint + '/customer/update', data).toPromise();
      if (resp) {
        let updateCount = this.updateFlag.getValue();
        this.updateFlag.next(++updateCount);
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async updateUserPassword(data): Promise<any> {
    try {
      const resp: any = await this.http.post(this.baseEndpoint + '/customer/update/password', data).toPromise();
      if (resp) {
        return resp.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async getAllUserAddresses(type = ''): Promise<any> {
    try {
      const addresses: any = await this.http.get(this.baseEndpoint + '/customer/addresses/' + type).toPromise();
      if (addresses) {
        return addresses.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async getUserAddressById(id): Promise<any> {
    try {
      const addresses: any = await this.http.get(this.baseEndpoint + '/customer/address/' + id).toPromise();
      if (addresses) {
        return addresses.data;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async deleleUserAddress(id): Promise<boolean> {
    try {
      const addresses: any = await this.http.get(this.baseEndpoint + '/customer/remove-address-information/' + id).toPromise();
      if (addresses) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async sendForgotPasswordLink(data): Promise<boolean> {
    try {
      const link: any = await this.http.post(this.baseEndpoint + '/customer/forget-password', data).toPromise();
      if (link) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async sendEmailLink(data): Promise<boolean> {
    try {
      const link: any = await this.http.post(this.baseEndpoint + '/customer/resend-email-link', data).toPromise();
      if (link) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  async validateForgotPasswordLink(token): Promise<boolean> {
    try {
      const link: any = await this.http.post(this.baseEndpoint + '/customer/validate-password-link', {token}).toPromise();
      if (link) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async validateEmailLink(token): Promise<boolean> {
    try {
      const link: any = await this.http.post(this.baseEndpoint + '/customer/validate-email-link', {token}).toPromise();
      if (link) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async resetPassword(token, password): Promise<boolean> {
    try {
      const link: any = await this.http.post(this.baseEndpoint + '/customer/reset-password', {token, password}).toPromise();
      if (link) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

}
