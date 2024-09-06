import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, lastValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseEndpoint: string;
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId) {
    this.baseEndpoint  = environment.apiUrl + environment.webId;
  }


  addProductToCache(product) {
    return this.http.post(this.baseEndpoint + '/product/cache', {product}).toPromise();
  }

  // tslint:disable-next-line:typedef
  searchProductByTitle(data) {
    return this.http.get(this.baseEndpoint + '/catalogue-search/title-list', {
      headers: { ignoreLoadingBar: '' },
      params: data
    });
  }

  getProductDetails(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/detail/' + id);
  }

  getProductAttributes(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/attributes/' + id);
  }

  getAttributeHeaders(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/groupheader/' + id);
  }

  getProductAccessories(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/accessories/' + id);
  }

  getProductJointAttributes(id): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/jattributes/' + id);
  }

  getProductDetailsByUrl(url): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/byurl/' + encodeURIComponent(url));
   }

    // tslint:disable-next-line:typedef
  getCategoryByUrl($url) {
    return this.http.get(this.baseEndpoint + '/category/byurl/' + $url);
  }
  // tslint:disable-next-line:typedef
  getCategoryById($id) {
    return this.http.get(this.baseEndpoint + '/category/' + $id);
  }
  // tslint:disable-next-line:typedef
  getBrandById($id) {
    return this.http.get(this.baseEndpoint + '/brand/' + $id);
  }

  async getProductWarranty($id): Promise<any> {
    try {
      const resp = await this.http.get(this.baseEndpoint + 'product/warranty/' + $id).toPromise();
      return resp;
    } catch (err) {
      return false;
    }

  }

  async getSubcategories($id): Promise<any> {
    try {
      const resp = await this.http.get(this.baseEndpoint + 'category/subcategories/' + $id).toPromise();
      return resp;
    } catch (err) {
      return false;
    }
  }

   // tslint:disable-next-line:typedef
   getCategoryProducts($id, $data) {
    return this.http.post(
      this.baseEndpoint + '/category/' + $id + '/products',
      $data,
      { headers: { ignoreLoadingBar: '' } }
    );
  }

// tslint:disable-next-line:typedef
  getBrandProducts($id, $data) {
    return this.http.post(
      this.baseEndpoint + '/brand/' + $id + '/products',
      $data,
      { headers: { ignoreLoadingBar: '' } }
    );
  }

  // tslint:disable-next-line:typedef
  categoryProductsFilters($id, data) {
    return this.http.post(
      this.baseEndpoint + '/category/' + $id + '/filters', data
    );
  }

  // tslint:disable-next-line:typedef
  brandProductsFilters($id, data) {
    return this.http.post(
      this.baseEndpoint + '/brand/' + $id + '/filters', data
    );
  }

  // tslint:disable-next-line:typedef
  searchProducts($data) {
    return this.http.post(this.baseEndpoint + '/catalogue-search/products', $data);
  }

  saveSearch(keyword){
    return this.http.get(this.baseEndpoint + '/save-search', {
      params: {keyword}
    })
  }

  // tslint:disable-next-line:typedef
  serachProductsFilters($data) {
    return this.http.post(this.baseEndpoint + '/catalogue-search/products/filters', $data);
  }


  getProductsByIds(idsList, byCategory = true): Observable<any> {
    const data = {
      ids : idsList.split(','),
    };
    let url = this.baseEndpoint + '/product/by-ids';
    if (!byCategory) {
      url = this.baseEndpoint + '/product/by-ids?nogroup=true';
    }
    return this.http.post(url, data);
  }

  getProductTypesByBrands(brand): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/typebybrand/' + brand);
  }

  getProductSeriesByTypesBrands(type, brand): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/seriesbytypebrand/' + brand + '/' + type);
  }

  getProductModelBySeriesTypesBrands(model, type, brand): Observable<any> {
    return this.http.get(this.baseEndpoint + '/product/modelbyseriestypebrand/' + brand + '/' + type + '/' + model );
  }

  getProductQuotes($data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/email/quote', $data);
  }
  async getRequestForm($data): Promise<any> {
    try {
      const resp$: any = this.http.post(this.baseEndpoint + '/email/quote', $data);
      const resp: any = await lastValueFrom(resp$);
      return resp.data;
    }catch (error) {
      return false;
    }
  }

  mapCategoryUrl(data): Observable<any> {
    return this.http.post(this.baseEndpoint + '/website/test', data);
  }


  async getCategoryParents($id): Promise<any> {
    //if(isPlatformBrowser(this.platformId)){
    try {
      const resp: any = await this.http.get(this.baseEndpoint + '/category/' + $id + '/parents').toPromise();
      return resp.data;
    } catch (err) {
      return false;
    }
    //}
  }

  async sendPriceAlert($data): Promise<any> {
    try {
      const resp: any = await this.http.post(this.baseEndpoint + '/product/price-alert/', $data).toPromise();
      return resp.data;
    } catch (err) {
      return false;
    }
  }

}
