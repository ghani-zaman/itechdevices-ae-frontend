import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseEndpoint: string;
  wishCount = new Subject<number>();
  wishCount$ = this.wishCount.asObservable();
  isBrowser = false;
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.baseEndpoint = environment.apiUrl + environment.webId;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async getWishList(keyword: any): Promise<any> {
    if (this.isBrowser){
      const list: any = await this.http
        .get(this.baseEndpoint + '/wishlist?keyword=' + keyword)
        .toPromise();

    return list.data;
    }
  }

  updateWishlist(data): void {
    this.wishCount.next(data.products.length);
  }

  addProducts(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/wishlist/add', {
      product: data,
    });
  }

  removeProduct(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/wishlist/remove', {
      product: data,
    });
  }
  emptyList(): Observable<any> {
    return this.http.get(this.baseEndpoint + '/empty');
  }
}
