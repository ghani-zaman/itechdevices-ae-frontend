import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  baseEndpoint: string;
  constructor(private http: HttpClient) {
    this.baseEndpoint  = environment.apiUrl + environment.webId;
  }

  fedexDomestic(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/shipping/domestic', data);
  }

  fedexInternational(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/shipping/international', data);
  }
}
