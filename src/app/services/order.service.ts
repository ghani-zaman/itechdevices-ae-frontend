import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyToastService } from './my-toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseEndpoint: string;
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private toast: MyToastService,
  ) {
    this.baseEndpoint = environment.apiUrl + environment.webId;
  }

  addOrder(data): Observable<any> {
    return  this.http.post(this.baseEndpoint + '/order/place-order', data);
  }
  async addOrderNew(data): Promise<any> {
    try {
      const resp$: any = this.http.post(this.baseEndpoint + '/order/place-order-new', data);
      const resp: any = await lastValueFrom(resp$);
      if(resp) {
        return resp.data;
      }else{
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  getMyOrdersList(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/order', data);
  }

  getOrderById(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/order/' + id);
  }

  getGuestOrderById(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/order/guest/' + id);
  }

  getOrderByInternalId(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/order/internal/' + id);
  }
  getGuestOrderByInternalId(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/order/guest/internal/' + id);
  }

  getPayTraceKey(orderId): Observable<any> {
    return this.http.get(this.baseEndpoint + '/payment/key/' + orderId);
  }

  async payTracePayment(id, data): Promise<any> {
    try {
      const orderData: any = await this.http.post(this.baseEndpoint + '/payment/order/' + id, data).toPromise();
      return orderData.data;
    } catch (err) {
      return false;
    }
  }

  async getDomesticRates(data): Promise<any> {
    try {
      const res: any = await this.http.post(this.baseEndpoint + '/shipping/domesticfinal', data).toPromise();
      if(res) {
        //console.log('shiDom', res.data);
        const methods = res.data;
        const finalMethods = [];
        for (let i = 0; i < methods.length; i++) {
          const method = methods[i];
          method.cost = method.cost + 10.00;
          finalMethods[i] = method
        }
        return finalMethods;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async confirmStripeOrder(data): Promise<any> {
    try {
      const resp$: any = this.http.post(this.baseEndpoint + '/order/place-order-confirm', data);
      const resp: any = await lastValueFrom(resp$);
      if(resp) {
        return resp.data;
      }else{
        return false;
      }
    } catch (err) {
      return false;
    }
  }
  async getInternationalRates(data): Promise<any> {
    try {
      const res: any = await this.http.post(this.baseEndpoint + '/shipping/internationalfinal', data).toPromise();
      if(res) {
        const methods = res.data;
        const finalMethods = [];
        for (let i = 0; i < methods.length; i++) {
          const method = methods[i];
          method.cost = method.cost + 10.00;
          finalMethods[i] = method
        }
        return finalMethods;

      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}
