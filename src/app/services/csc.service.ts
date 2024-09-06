import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CscService {
  baseEndpoint: string;
  constructor(private http: HttpClient) {
    this.baseEndpoint  = environment.apiUrl + 'csc/';
  }


  async getCountriesList(): Promise<any> {
    try {
      const resp: any = await this.http.get(this.baseEndpoint + 'countries-new').toPromise();
      return resp.data;
    } catch (e) {
      return false;
    }
  }
  async getStateList(countryName): Promise<any> {
    try {
      const resp: any = await this.http.get(this.baseEndpoint + 'states-new/' + countryName).toPromise();
      return resp.data;
    } catch (e) {
      return false;
    }
  }
  async getCityList(stateName): Promise<any> {
    return [];
    try {
      const resp: any = await this.http.get(this.baseEndpoint + 'cities/' + stateName).toPromise();
      return resp.data;
    } catch (e) {
      return false;
    }
  }
}
