import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ElementRef,
  Inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { position } from '../model/position.model';
import { DataLayerService } from './data-layer.service';
import { WebsiteService } from './website.service';
import { ProductService } from './product.service';
declare const $: any;
@Injectable({
  providedIn: 'root',
})
export class CartService {
  isBrowser = false;
  cartposition: position = null;
  baseEndpoint: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private webservice: WebsiteService,
    private http: HttpClient,
    private dataLayerService: DataLayerService,
    private productService: ProductService
  ) // private elementRef: ElementRef,
  // private renderer: Renderer2
  {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.getWebsiteInfo();
    }
    this.baseEndpoint = environment.apiUrl + environment.webId;
  }
  private cartPostion = new Subject<position>();
  public firstPosition;
  private cartCount = new Subject<number>();
  public total = 0;

  cartPostion$ = this.cartPostion.asObservable();
  cartCount$ = this.cartCount.asObservable();

  async getWebsiteInfo(): Promise<void> {
    const website = await this.webservice.getWebiteInfo().toPromise();
    if (website) {
      // // console.log(website);
      if (this.isBrowser) {
        localStorage.setItem('sessiontoken', website.data.sessiontoken);
      }
    }
  }

  changePosition(pos: position): void {
    this.cartPostion.next(pos);
    this.firstPosition = pos;
  }

  changeCartCount(num: number): void {
    this.cartCount.next(num);
  }

  addProduct(
    productx: any,
    quantity: any,
    condition: any = 'refurbished_grade_a_price'
  ): Observable<any> {
    return this.productService.getProductDetailsByUrl(productx.url).pipe(
      map((resp: any) => {
        let product = resp.data;
        // console.log('pp', product)
        product.quantity = quantity;
        product.condition = condition;
        if (condition === 'price') {
          product.condition = 'refurbished_grade_a_price';
        }
        try{

        const pcondition = product?.product_condition;
        /*let pcondition = product?.attributes?.filter((attribute: any) => attribute?.attribute_id == 7);
        if (pcondition !== null && pcondition.length > 0) {
          pcondition = pcondition[0].attribute_value;
        }*/
        product.pcondition = pcondition;
      } catch (e) {
        product.pcondition = null;
      }


        this.addProductGaEvent(product, condition);
        return product;
      }),
      switchMap((product: any) =>
        this.http.post(`${this.baseEndpoint}/cart/add`, { product })
      )
    );
  }

  addProductGaEvent(product:any, condition: any, fromCart = true) {
    const GaEvent = {
      "event": "add_to_cart",
      "ecommerce": {
        "items": [{
          "item_id": product?.id,
          "item_name": product.title,
          "item_variant": product?.sku,
          "price":  product[condition] ?? product?.refurbished_grade_a_price,
          "item_brand": product.brand_name,
          "item_category": product.category_name,
          "item_conditon": (product.pcondition != null) ? product.pcondition : '',
          "index": 0,
          "quantity": (fromCart) ? product?.quantity : product.qty
        }],
        "currency": "AED",
        "value":  product[condition] ?? product?.refurbished_grade_a_price
      }
    };

    this.dataLayerService.logCustomDataEvent(GaEvent);
  }


  async calculateCartTotal(): Promise<void> {
    const data = await this.getCartList().toPromise();
    let count = 0;
    if (data) {
      let cartData = [];
      if (data.data.cartData && JSON.parse(data.data.cartData)) {
        cartData = JSON.parse(data.data.cartData);
      }
      for (const p of cartData) {
        count = count + p.qty;
      }
    }
    this.cartCount.next(count);
  }

  updatecalculateCartTotal(cart): void {
    const data = cart;
    let count = 0;
    if (data) {
      for (const p of cart) {
        count = count + p.qty;
      }
    }
    this.cartCount.next(count);
  }
  decreaseQuantity(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = [];
    }
    let index = 0;
    // tslint:disable-next-line:prefer-const
    for (let p of cart) {
      if (p.id === product.id) {
        p.quantity -= 1;
        if (p.quantity == 0) {
          cart.splice(index, 1);
        }
      }
      index++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.calculateCartTotal();
  }

  removeProduct(product): void {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = [];
    }
    let index = 0;
    for (let p of cart) {
      if (p.id === product.id) {
        cart.splice(index, 1);
      }
      index++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.calculateCartTotal();
  }
  getCartList(): Observable<any> {
    if(this.isBrowser)
    return this.http.get(this.baseEndpoint + '/cart/mini-details');
  }

  getFullcartList(): Observable<any> {
    if(this.isBrowser)
    return this.http.get(this.baseEndpoint + '/cart');
  }

  emptyCart(): void {
    localStorage.removeItem('cart');
    this.calculateCartTotal();
  }
  // tslint:disable-next-line:typedef
  getCartTotalAmount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = [];
    }
    let count = 0;
    for (let p of cart) {
      if (p.special_price != null) {
        count = count + p.quantity * p.special_price;
      } else {
        count = count + p.quantity * p.price;
      }
    }
    return {
      subTotal: count,
      grandTotal: count,
      tax: 0,
      shipping: 0,
    };
  }
  // tslint:disable-next-line:typedef
  getCartTotal() {
    return this.cartCount;
  }

  updateCart(data): Observable<any> {
    return this.http.put(this.baseEndpoint + '/cart/update', data);
  }

  deleteCart(): Observable<any> {
    return this.http.get(this.baseEndpoint + '/cart/empty');
  }
}
