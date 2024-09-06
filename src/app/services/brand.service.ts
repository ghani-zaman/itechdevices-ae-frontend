import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseEndpoint: string;
  constructor(private http: HttpClient) {
    this.baseEndpoint  = environment.apiUrl + environment.webId;
  }

  getBrands(): Observable<any> {
    return this.http.get(this.baseEndpoint + '/brand');
  }
}
