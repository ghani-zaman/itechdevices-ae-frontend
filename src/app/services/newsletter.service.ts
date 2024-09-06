import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  baseEndpoint: string;
  constructor(private http: HttpClient) {
    this.baseEndpoint  = environment.apiUrl + environment.webId;
  }

  async subscribe(data): Promise<any> {
    try {
      const response: any = await this.http.post(this.baseEndpoint + '/subscribe', data).toPromise();
      return response.data;
    } catch (err) {
      return false;
    }
  }
}
