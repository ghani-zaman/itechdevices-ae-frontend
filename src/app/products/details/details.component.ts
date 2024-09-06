import { Lightbox, LightboxModule } from 'ngx-lightbox';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injectable,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { position } from '../../model/position.model';
import { CartService } from 'src/app/services/cart.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import {
  CommonModule,
  DOCUMENT,
  isPlatformBrowser,
  Location,
  NgOptimizedImage,
} from '@angular/common';
import { MyToastService } from 'src/app/services/my-toast.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ComparelistService } from 'src/app/services/comparelist.service';
import { Meta, Title } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgDynamicBreadcrumbModule, NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { SEOService } from 'src/app/services/seo.service';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { UserService } from 'src/app/services/user.service';
import { RxFor } from '@rx-angular/template/for';
import { ProductPrintComponent } from '../product-print/product-print.component';
import { ProductCarouselComponent } from 'src/app/components/product-carousel/product-carousel.component';
import { ReviewsSliderComponent } from 'src/app/components/reviews-slider/reviews-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Attributes, IntersectionObserverHooks, LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule } from 'ng-lazyload-image';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { JsonldService } from 'src/app/services/jsonld.service';
import { JsonldComponent } from 'src/app/jsonld/jsonld.component';
import { ErrorsModule } from 'src/app/errors/errors.module';
import { RESPONSE } from 'src/express.tokens';
import { Response } from 'express'


declare const $: any;
declare var jQuery: any;
declare const $zopim: any;
declare const zE: any;
@Injectable()
class LazyLoadImageHooks extends IntersectionObserverHooks {
  // tslint:disable-next-line:typedef
  setup(attributes: Attributes) {
    // Overwride the path to the default image for all lazyloaded images
    attributes.defaultImagePath = '/assets/images/img-loader.svg';
    attributes.errorImagePath = '/assets/images/no-image.webp';
    // You can always call the base `setup` if you want to keep the default behavior
    super.setup(attributes);
  }
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [

    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: LazyLoadImageHooks },
  ],
  imports: [
    CommonModule,
    RouterModule,
    RxFor,
    ProductPrintComponent,
    ProductCarouselComponent,
    ReviewsSliderComponent,
    SlickCarouselModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgOptimizedImage,
    PipesModule,
    NgDynamicBreadcrumbModule,
    NgxSkeletonLoaderModule,
    JsonldComponent,
    LightboxModule,
    ErrorsModule
  ],
})
export class DetailsComponent implements OnInit, OnDestroy {
  gallery = [];

  slideConfig = {
    dots: false,
    infinite: false,
    arrows: false,
    // nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    // prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    speed: 300,
    slidesToShow: 1,
    nav: true,
    slidesToScroll: 1,
    adaptiveHeight: false,
    swipe: true,
  };

  slideConfigNav = {
    dots: false,
    infinite: false,
    arrows: true,
    // nextArrow: '<div class=\'nav-slider-button\'></div>',
    // prevArrow: '<div class=\'nav-slider-button\'></div>',
    speed: 300,
    slidesToShow: 5,
    asNavFor: '#slider',
    slidesToScroll: 1,
    adaptiveHeight: false,
    swipe: true,
    //  centerMode: true,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
  };
  cartposition: position = null;
  productLoading = true;
  attribLoading = false;
  product: any = null;
  groupHeaders: any = null;
  quantity = 1;
  env = environment;
  pdfPath = environment.pdfPath;
  imagespath = environment.imagesPath;
  condition = null;
  pricingObj: any = {};
  pricingValues = {
    refurbished_grade_a_price: 'Refurbished',
    refurbished_grade_b_price: 'Refurbished',
    new_price: 'New',
    new_bulk_price: 'New Bulk',
    mfr_refurbished_price: 'MFR Refurbished',
    factory_sealed_price: 'Factory Sealed',
  };
  isBrowser = false;
  otherAtts = [];
  otherJoints = [];
  rloading = false;
  aloading = false;
  cloading = false;
  uloading = false;
  cartLoading = false;
  wishLoading = false;
  compLoading = false;
  showAccessories = true;
  quoteForm: UntypedFormGroup;
  formCreated = false;
  quoteloading = false;
  warrantyImage = null;
  loggedIn = false;
  pcondition = null;
  pcapacity = null;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  webjson: any = {};
  webjson1: any = {};
  notFound = false;
  @ViewChild('captchaRef', { static: false }) captchaRef: any;
  private response: Response;
  constructor(
    private lightbox: Lightbox,
    private auth: UserService,
    private productService: ProductService,
    private arouter: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private modal: NgxSmartModalService,
    private toast: MyToastService,
    private wish: WishlistService,
    private compare: ComparelistService,
    private titleService: Title,
    private metaService: Meta,
    private location: Location,
    private builder: UntypedFormBuilder,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(DOCUMENT) private document: Document,
    private seo: SEOService,
    private dataLayerService: DataLayerService,
    private jsonLd: JsonldService,
    @Optional() @Inject(RESPONSE) response: any,
  ) {
    this.response = response;
    // console.log(this.response);
    this.isBrowser = isPlatformBrowser(platformId);
  }
  openchat(): void {
    //zE('messenger', 'open');
    $zopim.livechat.window.show();
  }
ngOnDestroy(): void {
  this.closeLightBox();
}
  async updateBreadcrumb($id): Promise<void> {
    const category = await this.productService.getCategoryParents($id);
    const collection = [];
    let maindata = JSON.parse(JSON.stringify(category));
    let tdata = JSON.parse(JSON.stringify(category));
    tdata.parents = null;
    collection.push(tdata);
    // // console.log('collection', collection);
    while (maindata.parents) {
      tdata = JSON.parse(JSON.stringify(maindata.parents));
      tdata.parents = null;
      collection.push(tdata);
      maindata = JSON.parse(JSON.stringify(maindata.parents));
    }
    collection.reverse();
    // // console.log('collection', collection);
    const breadcrumbs = [
      {
        label: 'Home',
        url: '/',
      },
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 1; i < collection.length; i++) {
      if (collection[i].urlsource) {
        const temp = {
          label: collection[i].name,
          url: '/categories/' + collection[i].urlsource.url,
        };
        breadcrumbs.push(temp);
      } else {
        const tempx = {
          label: collection[i].name,
          url: '',
        };
        breadcrumbs.push(tempx);
      }
    }
    breadcrumbs.push({
      label: this.product?.sku,
      url: ''
    });
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  createQuoteForm(): void {
    if(this.isBrowser){
    this.quoteForm = this.builder.group({
      name: [null, []],
      lastName: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          //Validators.pattern('^(?!.*(gmail|yahoo|hotmail|outlook)).*$'),
        ],
      ],
      phone: [null, []],
      // company: [null],
      // specifications: [null],
      price: [null, []],
      quantity: [1, [Validators.pattern('^[0-9\ ]+$')]],
      product: [null],
      condition:[null],
      brand: [null],
      category: [null],
      url: [sessionStorage.getItem('landing_url')],
      recaptchaReactive: [null, this.useCaptcha ? [Validators.required] : []],
    });
    this.formCreated = true;
    }
  }
  async submitQuoteForm(form) {
    if (this.useCaptcha) {
      await this.captchaRef.execute();
    } else {
      this.submitNow(form);
    }
  }

  async updateQuantity(qty) {
    if(qty == -1) {
      if(this.quantity > 1) {
        this.quantity = this.quantity + qty;
      }
    }else {
      this.quantity = this.quantity + qty;
    }
  }
  async submitNow(form): Promise<void> {
    if (form.invalid) {
      this.quoteForm.markAllAsTouched();
      // this.toast.error('Invalid form data');
      return;
    }
    this.quoteloading = true;
    this.quoteForm.controls.product.setValue(this.product);
    this.quoteForm.controls.price.setValue(this.product[this.condition]);
    this.quoteForm.controls.brand.setValue(this.product.brand_name);
    this.quoteForm.controls.condition.setValue(this.condition);
    this.quoteForm.controls.category.setValue(this.product.category_name);
    this.dataLayerService.logCustomDataEvent({
      event: 'request_quote_submission',
    });
    this.quoteForm.controls.product.setValue(this.product);
    this.productService.getProductQuotes(form.value).subscribe(
      (res: any) => {
        this.quoteloading = false;
        this.quoteForm.reset();
        this.quoteForm.clearValidators();
        this.quoteForm.markAsUntouched();
        this.router.navigate(['pages', 'rfq-thank-you']);
        this.toast.success(
          'Thanks for submitting your query. We will contact you soon'
        );
      },
      (err: any) => {
        this.quoteloading = false;
      }
    );
  }

  async ngOnInit(): Promise<void> {


    //this.addLightBoxImages();
    /*const datax = this.arouter.snapshot.params.url.split('.html');
    const data = datax[0];*/
    const data = this.arouter.snapshot.params.url;
    this.arouter.params.subscribe((routeParams) => {
      const rurl = routeParams.url; // .split('.html');
            this.closeLightBox();
            this.loadProduct(rurl);

    });
    // tslint:disable-next-line:no-shadowed-variable
    this.cartService.cartPostion$.subscribe((data: any) => {
      // // // console.log(data);
      this.cartposition = data;
    });
    if (!this.cartposition) {
      this.cartposition = this.cartService.firstPosition;
    }
    this.loggedIn = await this.auth.isAuthenticated();
  }
  setSeoTags(product): void {
    const title =
      (product.meta_title != null && product.meta_title != '') ? product.meta_title : product.title;
    const description =
      (product.meta_description != null && product.meta_description != '')
        ? product.meta_description
        : product.title;
    const keywords =
      product.meta_keywords != null ? product.meta_keywords : product.title;
    const image =
      product.images.length > 0 && product.images[0].image != null
        ? product.images[0].image
        : null;
    const url = this.document.location.href;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' });
    this.metaService.updateTag({ property: 'og: keywords', content: keywords });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:image:alt', content: title });
    this.metaService.updateTag({
      property: 'og:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'twitter:title', content: title });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: description,
    });
    this.metaService.updateTag({ property: 'twitter:image', content: image });
    this.metaService.updateTag({
      property: 'twitter:image:alt',
      content: title,
    });
    this.metaService.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.seo.createCanonicalURL();

  }
  logzendesandgaevent(product) {
    this.seo.logZendeskEvent();
    const GaEvent = {
      event: 'view_item',
      ecommerce: {
        items: [
          {
            item_id: product?.id,
            item_variant: product?.sku,
            item_name: product.title,
            price: this.product[this.condition],
            item_brand: product.brand_name,
            item_category: product.category_name,
            index: 0,
          },
        ],
        currency: 'AED ',
      },
    };
    this.dataLayerService.logCustomDataEvent(GaEvent);
  }
  setCondition(product): void {
    this.pricingObj = {};
    this.condition = 'refurbished_grade_a_price';
    if (
      product.refurbished_grade_a_price !== null &&
      product.refurbished_grade_a_price > 0
    ) {
      this.condition = 'refurbished_grade_a_price';
      this.pricingObj.refurbished_grade_a_price =
        product.refurbished_grade_a_price;
    }
    if (
      product.refurbished_grade_b_price !== null &&
      product.refurbished_grade_b_price > 0
    ) {
      if (this.condition === null) {
        this.condition = 'refurbished_grade_b_price';
      }
      this.pricingObj.refurbished_grade_b_price =
        product.refurbished_grade_b_price;
    }
    if (
      product.mfr_refurbished_price !== null &&
      product.mfr_refurbished_price > 0
    ) {
      if (this.condition === null) {
        this.condition = 'mfr_refurbished_price';
      }
      this.pricingObj.mfr_refurbished_price = product.mfr_refurbished_price;
    }
    if (product.new_price !== null && product.new_price > 0) {
      if (this.condition === null) {
        this.condition = 'new_price';
      }
      this.pricingObj.new_price = product.new_price;
    }
    if (product.new_bulk_price !== null && product.new_bulk_price > 0) {
      if (this.condition === null) {
        this.condition = 'new_bulk_price';
      }
      this.pricingObj.new_bulk_price = product.new_bulk_price;
    }
    if (
      product.factory_sealed_price !== null &&
      product.factory_sealed_price > 0
    ) {
      if (this.condition === null) {
        this.condition = 'factory_sealed_price';
      }
      this.pricingObj.factory_sealed_price = product.factory_sealed_price;
    }
    // // console.log(this.pricingObj);
  }
  checkHeader(attribs, data): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < attribs.length; i++) {
      if (this.checkArray(attribs[i].attribute_id, data) !== -1) {
        if (attribs[i].attribute_value !== '') {
          return true;
        }
      }
    }
    return false;
  }

  checkHeaderJoint(attribs, data): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < attribs.length; i++) {
      if (this.checkArray(attribs[i].id, data) !== -1) {
        if (attribs[i].attributes.length !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  checkArray(value, data): boolean | number {
    const darray = data.split(',');
    const result = darray.indexOf(value.toString());
    return result;
  }

  openCheckoutPage(): void {
    this.router.navigate(['/checkout']);
  }

  addLightBoxImages(): void {
    this.gallery = [
      {
        src: '/assets/images/product-paceholder.png',
        caption: 'Blank Image',
        thumb: '/assets/images/product-paceholder.png',
      },
    ];
  }

  addProductImages(list): void {
    this.gallery = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < list.length; i++) {
      const data = {
        src: list[i].image,
        caption: 'Image ' + (i + 1),
        thumb: list[i].image,
      };
      this.gallery.push(data);
    }
  }

  openLightBox(index = 0): void {
    // // console.log(index);
    this.lightbox.open(this.gallery, index);
  }

  closeLightBox(): void {
    this.lightbox.close();
  }

  openQuoteModal(): void {
    this.modal.getModal('myQuoteModal').open();
  }

  openShipModal(): void {
    this.modal.getModal('myShipModal').open();
  }

  openPriceAlert(): void {
    this.modal.getModal('myPriceAlert').open();
  }

  loadProduct(data): void {
    this.productLoading = true;
    this.productService.getProductDetailsByUrl(data).subscribe(
      (res: any) => {
        this.assignProduct(res);
        if (this.isBrowser) {
          (function ($) {
            $(document).ready(function () {
              var mheight = $('.product-extra').height();
              mheight -= 40;
              $('.product-detail-tabs .tab-content').css({
                maxHeight: mheight + 'px',
              });
            });
          })(jQuery);
        }
      },
      (err) => {
        if(err.status === 461) {
          if (this.response) {
            // response will only be if we have express
            // this.response.statusCode = 404;
            this.response.status(404);
          }
          this.notFound = true;
        }
        if (err.status !== 461 && err.status !== 462 && err.status !== 499) {
          this.productLoading = false;
        }

      }
    );
  }

  async assignProduct(resp): Promise<any> {
    if (resp.data.cache === true) {
      this.product = resp.data;
      this.setSeoTags(this.product);
      this.updateBreadcrumb(this.product.category_id);
      this.productLoading = false;
      this.setCondition(this.product);
      this.logzendesandgaevent(this.product);
      this.createQuoteForm();
      this.groupHeaders = this.product.groupHeaders
        ? this.product.groupHeaders
        : null;
      if (this.product.images.length > 0) {
        this.addProductImages(this.product.images);
      } else {
        if(this.product.category_name !== null){
          const cname = (this.product.category_name).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        this.addProductImages([{
          image: this.env.catImagesPath + cname + '.webp',
          catImage: true,
          thumb: this.env.catImagesPath + cname + '.webp',
        }])
      }
      }
      this.webjson = await this.jsonLd.productJson2(this.product, this.condition);
      this.attribLoading = false;
      // this.webjson1 = await this.jsonLd.productJson1(this.product, this.condition);
      // console.log(this.product);
      this.pcondition =  this.product.product_condition;
      /*const cond = this.product.attributes.filter(attribute=> attribute.attribute_id==7);
      if(cond && cond.length > 0){
        this.pcondition = cond[0].attribute_value;
      }*/
      const capacity = this.product.attributes.filter(attribute=> attribute.attribute_id==20);
      if(capacity && capacity.length > 0){
        this.pcapacity =  (capacity[0]?.unit)? capacity[0]?.attribute_value + ' ' + capacity[0].unit : capacity[0]?.attribute_value + ' ' +'';
      }
      //console.log(cond);

      this.rloading = false;
      this.uloading = false;
    } else {
      this.product = resp.data;
      this.updateBreadcrumb(this.product.category_id);
      this.createQuoteForm();
      this.product.alsobought = null;
      this.setCondition(this.product);
      this.setSeoTags(this.product);
      if (this.product.accessories != null && this.product.accessories != '') {
        this.loadProductAcccessories(this.product.accessories);
      }
      if (this.product.up_sells != null && this.product.up_sells != '') {
        this.product.alsobought = this.product.up_sells;
      }
      if (this.product.cross_sells != null && this.product.cross_sells != '') {
        if (this.product.up_sells != null) {
          this.product.alsobought =
            this.product.up_sells + ',' + this.product.cross_sells;
        } else {
          this.product.alsobought = this.product.cross_sells;
        }
      }
      if (this.product.alsobought != null && this.product.alsobought != '') {
        this.loadAlsoBoughtProducts(this.product.alsobought);
      }
      if (
        this.product.related_products != null &&
        this.product.related_products != ''
      ) {
        this.loadRelatedProducts(this.product.related_products);
      }
      if (this.product.images.length > 0) {
        this.addProductImages(this.product.images);
      }
      this.productLoading = false;
      this.attribLoading = true;
      // this.getWarrantyElement()
      await this.loadProductAttributes(this.product.id);
      await this.loadProductJointAttributes(this.product.id);
      if (this.product.attribute_group_id != null) {
        this.loadGroupHeaders(this.product.attribute_group_id);
      } else {
        this.createProductCache();
      }
      this.webjson = await this.jsonLd.productJson2(this.product, this.condition);
      // this.webjson1 = await this.jsonLd.productJson1(this.product, this.condition);
      this.pcondition =  this.product.product_condition;
      /*const cond = this.product.attributes.filter(attribute=> attribute.attribute_id==7);
      if(cond && cond.length > 0){
        this.pcondition = cond[0].attribute_value;
      }*/
      const capacity = this.product.attributes.filter(attribute=> attribute.attribute_id==20);
      if(capacity && capacity.length > 0){
        this.pcapacity =  (capacity[0]?.unit)? capacity[0]?.attribute_value + ' ' + capacity[0].unit : capacity[0]?.attribute_value + ' ' +'';
      }
      this.attribLoading = false;
    }
  }

  createProductCache() {
    this.productService.addProductToCache(this.product);
  }

  async loadProductAttributes(id): Promise<void> {
    try {
      const res = await this.productService
        .getProductAttributes(id)
        .toPromise();
      this.product.attributes = res.data;
      this.getWarrantyElement();
    } catch (err) {
      this.attribLoading = false;
    }
  }

  async getWarrantyElement(): Promise<void> {
    const warrantyAtb = this.product?.attributes.find(
      (i: any) => i.attribute_id === 19
    );
    if (warrantyAtb) {
      const value = warrantyAtb.attribute_value || '';
      const unitValue =
        warrantyAtb.unit === 'Year'
          ? 'y'
          : warrantyAtb.unit === 'Month'
          ? 'm'
          : 'lt';
      this.warrantyImage = 'assets/warranty/' + value + unitValue + '.png';
    } else {
      this.warrantyImage = null;
    }
  }

  loadGroupHeaders(id): void {
    this.productService.getAttributeHeaders(id).subscribe(
      (res: any) => {
        this.groupHeaders = res.data;
        if (this.groupHeaders.length > 0) {
          this.otherAtts = [];
          this.otherJoints = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.groupHeaders.length; i++) {
            const atts = this.groupHeaders[i].attributes.split(',');
            this.otherAtts.push(...atts);
            const jatts = this.groupHeaders[i].joint_attributes.split(',');
            this.otherJoints.push(...jatts);
          }
          this.otherAtts = this.otherAtts.filter((value) => value !== '');
          this.otherAtts = this.otherAtts.map((value) => parseInt(value, 10));
          this.otherJoints = this.otherJoints.filter((value) => value !== '');
          this.otherJoints = this.otherJoints.map((value) =>
            parseInt(value, 10)
          );
          const patts = this.product.attributes.map(
            (attr) => attr.attribute_id
          );
          const pjatts = this.product.jattributes.map((attr) => attr.id);
          const otherAttsFinals = patts.filter(
            (x) => !this.otherAtts.includes(x)
          );
          const otherJAttsFinals = pjatts.filter(
            (x) => !this.otherJoints.includes(x)
          );
          // tslint:disable-next-line:max-line-length
          this.groupHeaders.push({
            id: 0,
            title: 'Others',
            attributes: otherAttsFinals.join(','),
            joint_attributes: otherJAttsFinals.join(','),
          });
          this.product.groupHeaders = this.groupHeaders;
        }
        this.createProductCache();
      },
      (err: any) => {}
    );
  }

  async loadProductJointAttributes(id): Promise<void> {
    try {
      const res = await this.productService
        .getProductJointAttributes(id)
        .toPromise();
      this.product.jattributes = res.data;
    } catch (err) {
      this.attribLoading = false;
    }
  }

  loadProductAcccessories(accessories): void {
    this.productService.getProductsByIds(accessories).subscribe((res: any) => {
      // console.log(res.data);
      this.product.accessories = res.data;
      this.showAccessories = true;
    });
  }

  loadRelatedProducts(relatedProducts): void {
    this.rloading = true;
    this.productService.getProductsByIds(relatedProducts, false).subscribe(
      (res: any) => {
        this.product.related = res.data;
        this.rloading = false;
      },
      (err: any) => {
        this.rloading = false;
      }
    );
  }

  loadAlsoBoughtProducts(alsoBought): void {
    this.uloading = true;
    this.productService.getProductsByIds(alsoBought, false).subscribe(
      (res: any) => {
        this.product.also_bought = res.data;
        this.uloading = false;
      },
      (err: any) => {
        this.uloading = false;
      }
    );
  }

  loadUpsellProducts(upsellProducts): void {
    this.uloading = true;
    this.productService.getProductsByIds(upsellProducts, false).subscribe(
      (res: any) => {
        this.product.upsells = res.data;
        this.uloading = false;
      },
      (err: any) => {
        this.uloading = false;
      }
    );
  }
  loadCrossSellProducts(crossSellProducts): void {
    this.cloading = true;
    this.productService.getProductsByIds(crossSellProducts, false).subscribe(
      (res: any) => {
        this.product.crosssells = res.data;
        this.cloading = false;
      },
      (err: any) => {
        this.cloading = false;
      }
    );
  }

  quantityUpdate(value): void {
    this.quantity += value;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  async addToCart(prod, qty, cond): Promise<void> {
    this.cartLoading = true;
    try {
      const cart = await this.cartService
        .addProduct(prod, (qty>0) ? qty : 1, cond)
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

  async addToWishList(prod, cond): Promise<void> {
    this.wishLoading = true;
    try {
      prod.condition = cond;
      const list = await this.wish.addProducts(prod).toPromise();
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

  async addToCompare(prod, cond): Promise<void> {
    this.compLoading = true;
    try {
      prod.condition = cond;
      const complist = await this.compare.addProducts(prod).toPromise();
      if (complist) {
        this.compare.updateComparelist(complist.data);
        this.toast.success('Product added to compare list');
      }
      this.compLoading = false;
    } catch (err) {
      this.toast.error('Unable to add product');
      this.compLoading = false;
    }
  }

  onPrint(): void {
    if (this.isBrowser) {
      window.print();
    }
  }

  openRFQPage(productx: any, conditionx: any) {
    productx.condition = conditionx;
    localStorage.setItem('getQuoteProduct', JSON.stringify(productx));
    this.router.navigate(['/rfq-form'])
  }
}
