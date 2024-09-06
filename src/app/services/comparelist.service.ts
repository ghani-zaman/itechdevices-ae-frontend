import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComparelistService {
  baseEndpoint: string;
  compareCount = new Subject<number>();
  compareCount$ = this.compareCount.asObservable();
  constructor(
    private http: HttpClient
  ) {
    this.baseEndpoint = environment.apiUrl + environment.webId;
   }

  async getCompareList(): Promise<any> {
    const list: any  = await this.http.get(this.baseEndpoint + '/comparelist').toPromise();

    return list.data;
  }

  updateComparelist(data): void {
    this.compareCount.next(data.products.length);
  }

  addProducts(data): Observable<any>{
    return this.http.post(this.baseEndpoint + '/comparelist/add', {product: data});
  }

  removeProduct(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/comparelist/remove', {product: data});
  }
  emptyList(): Observable<any>{
    return this.http.get(this.baseEndpoint + '/empty');
  }
}
