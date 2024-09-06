import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartService } from 'src/app/services/cart.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-accessories',
  templateUrl: './product-accessories.component.html',
  styleUrls: ['./product-accessories.component.css']
})
export class ProductAccessoriesComponent implements OnInit {

  @Input() product: any;
  imagespath = environment.imagesPath;
  cartLoading = false;
  compLoading = false;
  wishLoading = false;
  env = environment;
  @Input() hideQuickOpen = false;
  cartQty = 1;
  taxPercent = environment.taxPercent;
  constructor(private modal: NgxSmartModalService, private cartService: CartService, private toast: MyToastService,
              private compare: ComparelistService,
              private dataLayerService: DataLayerService,
              private router: Router,
              private wish: WishlistService, private modalService: NgbModal  ) {
                //console.log('alist', this.hideQuickOpen);
               }

  ngOnInit(): void {
    //console.log('alist', this.hideQuickOpen);
  }
  incrementCart(): void{
    this.cartQty++;
  }

  recordSelectEvent() {
    const GaEvent = {
      "event": "select_item",
      "ecommerce": {
      "items": [{
      "item_id": this.product?.id,
      "item_name": this.product.name,
      "price": this.product.price,
      "item_brand": this.product.brand.name,
      "item_category": this.product.category.name,
      "item_variant": this.product?.sku,
      "index": 0
      }],
      "currency": "AED"
      }
     };
     // console.log(this.product);
     // console.log(GaEvent);
    this.dataLayerService.logCustomDataEvent(GaEvent);
  }

  decrementCart(): void{
    if (this.cartQty > 1){
    this.cartQty--;
    }
  }
  quickView(content): void {
    this.modalService.open(content, { size: 'lg' });
  }
  openShipModal(): void {
    this.modal.getModal('myShipModal_' + this.product.id).open();
  }

  async addToCart(prod, qty, cond): Promise<void> {
    this.cartLoading = true;
    try {
      const cart = await this.cartService
        .addProduct(prod, qty, cond)
        .toPromise();
      if (cart) {
        this.cartService.updatecalculateCartTotal(cart.data);
        this.router.navigate(['/cart']);
        this.toast.success('Product added to cart');
      }
      this.cartLoading = false;
    } catch (err) {
      this.toast.error('Unable to add product');
      this.cartLoading = false;
    }
  }

  async addToCompare(prod, cond): Promise<void> {
    this.compLoading = true;
    try {
      prod.condition = cond;
      const complist = await this.compare
        .addProducts(prod)
        .toPromise();
      if (complist) {
        this.compare.updateComparelist(complist.data);
        this.toast.success('Product added to compare list');
      }
      this.compLoading = false;
    } catch (err) {
      //  // console.log(err);
      this.toast.error('Unable to add product');
      this.compLoading = false;
    }
  }

  async addToWishList(prod,  cond): Promise<void> {
    this.wishLoading = true;
    try {
      prod.condition =  cond;
      const list = await this.wish
        .addProducts(prod)
        .toPromise();
      if (list) {
        this.wish.updateWishlist(list.data);
        this.toast.success('Product added to wishlist');
      }
      this.wishLoading = false;
    } catch (err) {
      this.toast.error('Unable to add product');
      this.wishLoading = false;
    }
  }


}

