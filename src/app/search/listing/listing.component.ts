import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { slideInUpAnimation } from 'angular-animations';
import { ProductService } from 'src/app/services/product.service';
import { SEOService } from 'src/app/services/seo.service';
import { UrlencoderService } from 'src/app/services/urlencoder.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  animations: [slideInUpAnimation({ anchor: 'slidein' })],
})
export class ListingComponent implements OnInit, OnDestroy {
  keyword: any;
  el: ElementRef;
  products = [];
  searchData: any;
  productLoading = false;
  filterLoading = false;
  filters = {
    attributes: {},
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 999999999,
  };
  totalProducts = 0;

  defaultPageSize = environment.pageSize;
  currentPage = 1;
  listView = false;
  showfilters = false;
  sortOrder = 'p.id DESC'; //'wp.refurbished_grade_a_price ASC'; //'p.id DESC';
  filtersForm: UntypedFormGroup;
  queryFilters: any = {};
  currentFilters: any = {
    attributes: {},
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 999999999,
  };
  onSale = false;
  routerPath: any;
  isBrowser = false;
  // tslint:disable-next-line:max-line-length
  constructor(
    private productService: ProductService,
    private arouter: ActivatedRoute,
    private router: Router,
    private builder: UntypedFormBuilder,
    private encoderService: UrlencoderService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleList(): void {
    this.listView = !this.listView;
  }

  showList(): void {
    this.listView = true;
  }

  showGrid(): void {
    this.listView = false;
  }

  ngOnInit(): void {
    this.arouter.params.subscribe((res) => {
      this.routerPath = this.router.url;
      if (this.routerPath.includes('/search/model/')) {
        this.showfilters = false;
        this.keyword = '';
        this.currentFilters = {
          attributes: [
            {
              attribute_id: 3,
              attribute_values: [res.keyword],
            },
          ],
          categories: [],
          brands: [],
          minPrice: 0,
          maxPrice: 99999999999,
        };
        this.getProducts(this.currentFilters);
      } else {
        this.keyword = (res.keyword) ? decodeURIComponent(res.keyword) : '*';
        const qfilters = this.prepareFilters();
        this.getProducts(qfilters, this.currentPage);
        this.getProdutFilters(this.currentFilters);
      }
    });
    this.title.setTitle((this.keyword == '*') ? 'Categories' : 'Search results for: ' + this.keyword);
    this.meta.updateTag({ name: 'description', content: (this.keyword == '*') ? 'Categories' : 'Search results for: ' + this.keyword });
    this.meta.updateTag({ name: 'robots', 'content': 'noindex, nofollow'});
    // this.seo.createCanonicalURL();
    this.seo.removeCanonical();
    this.seo.logZendeskEvent();
    // this.getProducts();
  }

  prepareFilters(): any {
    if (this.routerPath.includes('/flash-deals')) {
      this.showfilters = false;
      const queryparams = this.arouter.snapshot.queryParams.filter;
      const page = this.arouter.snapshot.queryParams.page;
      if (page) {
        this.currentPage = page;
      }

      // const onSale1 = this.arouter.snapshot.queryParams.onSale;
      // // console.log(onSale1);
      // tslint:disable-next-line:triple-equals
      //         if (onSale1 && (onSale1 == 'true' || onSale1 == true || onSale1 == 1)) {
      this.onSale = true;
      // } else {
      // this.onSale = false;
      // }

      const limit = this.arouter.snapshot.queryParams.limit;
      if (limit) {
        this.defaultPageSize = limit;
      }
      const order = this.arouter.snapshot.queryParams.order;
      if (order) {
        this.sortOrder = order;
      }
      let cats = [];
      if (this.arouter.snapshot.queryParams.category) {
        cats = this.arouter.snapshot.queryParams.category.split(',');
      }
      let brand = [];
      if (this.arouter.snapshot.queryParams.brand) {
        brand = this.arouter.snapshot.queryParams.brand.split(',');
      }

      let addfilter = false;
      const qfilters = {
        attributes: [],
        categories: cats,
        brands: brand,
        minPrice: 0,
        maxPrice: 99999999999,
      };
      const filterqparams = {};
      if (queryparams) {
        addfilter = true;
        const attribs = queryparams.split(';');

        // tslint:disable-next-line:forin
        for (const attrib in attribs) {
          const temp = attribs[attrib].split(':');
          qfilters.attributes.push({
            attribute_id: temp[0],
            attribute_values: [temp[1]],
            attribute_type: [temp[2]],
          });
          filterqparams[temp[0]] = temp[1].split(',');
        }
      }
      this.queryFilters.attributes = filterqparams;
      this.queryFilters.name = this.keyword;
      this.queryFilters.categories = cats;
      this.queryFilters.brands = brand;
      // // console.log(qfilters);
      // this.showfilters = true;
      this.currentFilters = qfilters;
      this.keyword = this.keyword;
      return qfilters;
    } else {
      const queryparams = this.arouter.snapshot.queryParams.filter;
      const page = this.arouter.snapshot.queryParams.page;
      if (page) {
        this.currentPage = page;
      }

      const onSale1 = this.arouter.snapshot.queryParams.onSale;
      // // console.log(onSale1);
      // tslint:disable-next-line:triple-equals
      if (onSale1 && (onSale1 == 'true' || onSale1 == true || onSale1 == 1)) {
        this.onSale = true;
      } else {
        this.onSale = false;
      }

      const limit = this.arouter.snapshot.queryParams.limit;
      if (limit) {
        this.defaultPageSize = limit;
      }
      const order = this.arouter.snapshot.queryParams.order;
      if (order) {
        this.sortOrder = order;
      }
      let cats = [];
      if (this.arouter.snapshot.queryParams.category) {
        cats = this.arouter.snapshot.queryParams.category.split(',');
      }
      let brand = [];
      if (this.arouter.snapshot.queryParams.brand) {
        brand = this.arouter.snapshot.queryParams.brand.split(',');
      }

      let addfilter = false;
      const qfilters = {
        attributes: [],
        categories: cats,
        brands: brand,
        minPrice: 0,
        maxPrice: 99999999999,
      };
      const filterqparams = {};
      if (queryparams) {
        addfilter = true;
        const attribs = queryparams.split(';');

        // tslint:disable-next-line:forin
        for (const attrib in attribs) {
          const temp = attribs[attrib].split(':');
          qfilters.attributes.push({
            attribute_id: temp[0],
            attribute_values: [temp[1]],
            attribute_type: [temp[2]],
          });
          filterqparams[temp[0]] = temp[1].split(',');
        }
      }
      this.queryFilters.attributes = filterqparams;
      this.queryFilters.name = this.keyword;
      this.queryFilters.categories = cats;
      this.queryFilters.brands = brand;
      // // console.log(qfilters);
      this.showfilters = true;
      this.currentFilters = qfilters;
      this.keyword = this.keyword;
      return qfilters;
    }
  }

  filtersChanged(event): void {
    const data = JSON.parse(event);
    const myfilters = data.filters;
    const changed = data.changed;
    this.currentFilters = myfilters;
    let filterString: any = null;
    const temp = [];
    if (myfilters.attributes && myfilters.attributes.length == 0) {
      filterString = '';
    }

    if (myfilters.attributes && myfilters.attributes.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < myfilters.attributes.length; i++) {
        temp.push(
          myfilters.attributes[i].attribute_id +
            ':' +
            myfilters.attributes[i].attribute_values.join(',')
        );
      }
      // // console.log(temp);
      filterString = temp.join(';');
    }
    this.currentPage = 1;
    let queryParams: Params;
    queryParams = {
      category: myfilters.categories.join(','),
      brand: myfilters.brands.join(','),
      page: this.currentPage,
      limit: this.defaultPageSize,
      order: this.sortOrder,
    };
    if (filterString != null) {
      queryParams = {
        category: myfilters.categories.join(','),
        brand: myfilters.brands.join(','),
        filter: filterString,
        page: this.currentPage,
        limit: this.defaultPageSize,
        order: this.sortOrder,
      };
    }
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    if (myfilters.keyword != null) {
      this.keyword = myfilters.keyword;
    }
    // // // console.log('urltest' , this.encoderService.encode(myfilters, 'url'));
    this.getProducts(myfilters, 1);
    this.getProdutFilters(myfilters, changed);
  }
  getProducts(
    filterData = {
      attributes: [],
      categories: [],
      brands: [],
      minPrice: 0,
      maxPrice: 9999999999,
    },
    page = 1
  ): void {
    this.currentPage = page;
    this.productLoading = true;
    this.products = [];
    this.totalProducts = 0;
    this.productService
      .searchProducts({
        page: this.currentPage,
        limit: this.defaultPageSize,
        onSale: this.onSale,
        orderBy: this.sortOrder,
        keyword: this.keyword,
        filters: filterData,
      })
      .subscribe(
        (res: any) => {
          this.products = res.data.products;
          this.productLoading = false;
          this.totalProducts = res.data.total;
        },
        (err) => {
          this.productLoading = false;
          this.totalProducts = 0;
        }
      );
  }

  getProdutFilters(filters = null, changed = 0): void {
    const filtersCopy: any = this.filters;
    this.filters = {
      attributes: [],
      categories: [],
      brands: [],
      minPrice: 0,
      maxPrice: 9999999999,
    };
    if (filters === null) {
      filters = {
        attributes: [],
        categories: [],
        brands: [],
        minPrice: 0,
        maxPrice: 9999999999,
      };
    }
    this.filterLoading = true;
    this.productService
      .serachProductsFilters({
        keyword: this.keyword,
      })
      .subscribe(
        (res: any) => {
          this.filters.attributes = res.data.attributes || [];
          if (changed > 0) {
            const index = filters.attributes.findIndex(
              (item) =>
                item.attribute_id == changed ||
                item.attribute_id.toString() == changed
            );
            if (index > -1) {
              const index2 = filtersCopy.attributes.findIndex(
                (item) => item.attribute_id == changed
              );
              // this.filters.attributes = [];
              let index3 = -1;
              if (Array.isArray(this.filters.attributes)) {
                index3 = this.filters.attributes.findIndex(
                  (item) => item.attribute_id == changed
                );
              }
              if (index3 != -1) {
                this.filters.attributes[index3] =
                  filtersCopy.attributes[index2];
              }
            }
          }
          if (changed == -2) {
            this.filters.categories = filtersCopy.categories;
          } else {
            this.filters.categories = res.data.categories || [];
          }
          if (changed == -1) {
            this.filters.brands = filtersCopy.brands;
          } else {
            this.filters.brands = res.data.brands || [];
          }
          this.filters.minPrice = res.data.minPrice || 0;
          this.filters.maxPrice = res.data.maxPrice || 9999999999;
          this.prepareFilters();
          this.filterLoading = false;
        },
        (err) => {
          this.filterLoading = false;
        }
      );
  }
  changePageSize(event): void {
    this.defaultPageSize = event.target.value;
    this.currentPage = 1;
    const queryParams: Params = {
      page: this.currentPage,
      limit: this.defaultPageSize,
    };
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.getProducts(this.currentFilters, this.currentPage);
  }

  changeOrder(event): void {
    this.sortOrder = event.target.value;
    this.currentPage = 1;
    const queryParams: Params = {
      page: this.currentPage,
      order: this.sortOrder,
    };
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.getProducts(this.currentFilters, this.currentPage);
  }
  changePage(event): void {
    this.currentPage = event;
    const queryParams: Params = {
      page: this.currentPage,
    };
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.getProducts(this.currentFilters, this.currentPage);
  }

  changeOnSale(event): void {
    // // console.log(event.target.checked);
    this.onSale = event.target.checked;
    const queryParams: Params = {
      onSale: this.onSale,
    };
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.getProducts(this.currentFilters, this.currentPage);
  }

  addToCart(): void {
    const bElement = this.el.nativeElement.querySelector(
      '.shopping_bg'
    ) as HTMLElement;

    // // console.log(bElement);
  }
  ngOnDestroy(): void {
    this.meta.updateTag({'name': 'robots', 'content': environment.robots});
  }
}
