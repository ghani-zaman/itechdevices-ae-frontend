import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { slideInUpAnimation } from 'angular-animations';

import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { JsonldService } from 'src/app/services/jsonld.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  // animations: [slideInUpAnimation({ anchor: 'slidein' })],
})
export class ListingComponent implements OnInit {
  keyword: any;
  category: any;
  products = [];
  subcategories = [];
  children = [];
  searchData: any;
  search: any;
  productLoading = true;
  totalProducts = 0;
  defaultPageSize = environment.pageSize;
  currentPage = 1;
  listView = false;
  sortOrder = 'p.id DESC'; //'wp.refurbished_grade_a_price ASC'; //'p.id DESC';
  onSale = false;
  fixedParams : any= {};

  filterLoading = true;
  filters = {
    attributes: {},
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 9999999999,
  };

  filtersForm: UntypedFormGroup;
  queryFilters: any = {};
  currentFilters: any = {
    attributes: {},
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 9999999999,
  };
  firstFilters: any = {
    attributes: {},
    categories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 9999999999,
  };
  isBrowser = false;
  pageLoad = true;
  jsonld: any = {};
  constructor(
    private productService: ProductService,
    private arouter: ActivatedRoute,
    private router: Router,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private titleService: Title,
    private metaService: Meta,
    private seo: SEOService,
    private jsonldservice: JsonldService,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setSeoTags(categgory): void {

    const title = (categgory.metaTitle) ? categgory.metaTitle : null;
    const description =
    (categgory.metaDescription) ? categgory.metaDescription : null;
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'robots', content: environment.robots })
      this.metaService.updateTag({ name: 'description', content: description })
      this.metaService.updateTag({ property: 'og:title', content: title })
      this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' })

      this.metaService.updateTag({ property: 'og:image:alt', content: title })
      this.metaService.updateTag({ property: 'og:description', content: description })

      this.metaService.updateTag({ property: 'twitter:title', content: title })
      this.metaService.updateTag({ property: 'twitter:description', content: description })

      this.metaService.updateTag({ property: 'twitter:image:alt', content: title })
      this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' })
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
  }

  setMenuSeoTags(categgory, cat: any = {}): void {

    const title = (categgory.meta_title) ? categgory.meta_title : ((cat.metaTitle) ? cat.metaTitle : null);
    const description =
    (categgory.meta_description) ? categgory.meta_description : ((cat.metaDescription) ? cat.metaDescription : null);
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' });

      this.metaService.updateTag({ property: 'og:image:alt', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });

      this.metaService.updateTag({ property: 'twitter:title', content: title });
      this.metaService.updateTag({ property: 'twitter:description', content: description });

      this.metaService.updateTag({ property: 'twitter:image:alt', content: title });
      this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
  }



  async updateBreadcrumb($id): Promise<void> {
    const category = await this.productService.getCategoryParents($id);
    const collection = [];
    let maindata = JSON.parse(JSON.stringify(category));
    let tdata = JSON.parse(JSON.stringify(category));
    tdata.parents = null;
    collection.push(tdata);
    // console.log('collection', collection);
    while (maindata.parents) {
      tdata = JSON.parse(JSON.stringify(maindata.parents));
      tdata.parents = null;
      collection.push(tdata);
      maindata = JSON.parse(JSON.stringify(maindata.parents));

    }
    collection.reverse();
    // console.log('collection', collection);
    const breadcrumbs  =  [
      {
        label: 'Home',
        url: '/'
      }
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 1 ; i < collection.length ; i++) {
      if (collection[i].urlsource){
        const temp = {
          label : collection[i].name,
          url: '/categories/' + collection[i].urlsource.url
        };
        breadcrumbs.push(temp);
      } else {
        const tempx = {
          label : collection[i].name,
          url: ''
        };
        breadcrumbs.push(tempx);
      }

    }
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
  showList(): void {
    this.listView = true;
  }

  showGrid(): void {
    this.listView = false;
  }

  ngOnInit(): void {
    const data =  this.arouter.snapshot;
    // // console.log(data);
    this.arouter.url.subscribe((res) => {
      // console.log('cres', res);
      this.products = [];
      this.totalProducts = 0;
      this.productLoading = true;
      this.pageLoad = true;
      const pathArray = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < res.length; i++) {
        pathArray.push(res[i].path);
      }
      const pathdata = pathArray.join('____');
      this.productService
        .mapCategoryUrl({ url: pathdata })
        .subscribe((res2) => {
          // console.log(res2);
          this.fixedParams = res2.data;

          this.geCat(res2.data);
        });
    });

    /*this.arouter.params.subscribe((res) => {

        this.search = res.search;
        this.getProducts();
        this.getProdutFilters();
    });*/
  }

  async geCat(param: any = {}): Promise<void> {
    this.productLoading = true;
    let data: any;
    try {
      // tslint:disable-next-line:radix
      /*if (Number.isInteger(parseInt(this.search))) {
        data = await this.productService.getCategoryById(this.search).toPromise();
      } else {
        data = await this.productService.getCategoryByUrl(this.search).toPromise();
      }*/
      data = await this.productService
        .getCategoryById(param.category_id)
        .toPromise();
      this.category = data.data.category_details;
      this.jsonld = this.jsonldservice.getCategoryJson(this.category);
      this.children = data.data.children;
      if(!this.fixedParams.is_top_menu) {
        // console.log('indise false');
        this.setSeoTags(this.category);
      }
      if(this.fixedParams.is_top_menu) {
        this.setMenuSeoTags(this.fixedParams, this.category);
      }
      this.updateBreadcrumb(this.category.id);
      this.subcategories = data.data.featured_sub_categories;
      const qfilters = this.prepareFilters(param);
      await this.getProducts(qfilters, this.currentPage);
      this.getProdutFilters(this.firstFilters);
    } catch (e) {
      // // console.log(e);
      this.productLoading = false;
    }
  }

  prepareFilters(param): any {
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
    let catsx = [];
    if (this.arouter.snapshot.queryParams.category) {
      cats = this.arouter.snapshot.queryParams.category.split(',');
    }
    if (param.category_id) {
      cats.push(param.category_id.toString());
      catsx.push(param.category_id.toString());
      if(this.pageLoad ) {
        cats.push(...this.children);
        catsx.push(...this.children);
          this.pageLoad = false;
        }
      cats = cats.map(c => c.toString());
      catsx = catsx.map(c => c.toString());


    }
    let brand = [];
    let brandx = [];
    if (this.arouter.snapshot.queryParams.brand) {
      brand = this.arouter.snapshot.queryParams.brand.split(',');
    }
    if (param.brand_id) {
      brand.push(param.brand_id.toString());
      brandx.push(param.brand_id.toString());
    }

    this.keyword = '';
    if (this.arouter.snapshot.queryParams.keyword) {
      this.keyword = this.arouter.snapshot.queryParams.keyword;
    }
    const myAttributes = [];
    const myAttributesx = [];
    if (param.attribute_id && param.attribute_value) {
      myAttributes.push({
        attribute_id: param.attribute_id,
        attribute_values: [param.attribute_value],
      });
      myAttributesx.push({
        attribute_id: param.attribute_id,
        attribute_values: [param.attribute_value],
      });
    }

    let addfilter = false;
    const qfilters = {
      attributes: myAttributes,
      categories: cats,
      brands: brand,
      minPrice: 0,
      keyword: this.keyword,
      maxPrice: 99999999999,
    };
    const filterqparams = {};
    const filterqparamsx = {};
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
    if (myAttributes.length > 0) {
      if (param.attribute_id && param.attribute_value) {
        filterqparams[param.attribute_id] = param.attribute_value.split(',');
        filterqparamsx[param.attribute_id] = param.attribute_value.split(',');
      }
    }
    this.queryFilters.attributes = filterqparams;
    this.queryFilters.categories = cats;
    this.queryFilters.brands = brand;
    this.queryFilters.name = this.keyword;
    this.firstFilters = {
      attributes: filterqparamsx,
      categories: catsx,
      brands: brandx,
      minPrice: 0,
      keyword: this.keyword,
      maxPrice: 99999999999,
    };
   // console.log('qfills', qfilters);
   // console.log('ffills', this.firstFilters);
    this.currentFilters = qfilters;
    // // console.log('cfilters', this.currentFilters);
    return qfilters;
  }

  filtersChanged(event): void {
    const data = JSON.parse(event);
    const myfilters = data.filters;
    const changed = data.changed;
    // // console.log(myfilters);
    // // console.log(this.filters);
    this.currentFilters = myfilters;
    let filterString: any = null;
    const temp = [];
    if (myfilters.attributes && myfilters.attributes.length === 0) {
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
      keyword: myfilters.keyword,
    };
    if (filterString != null) {
      queryParams = {
        category: myfilters.categories.join(','),
        brand: myfilters.brands.join(','),
        filter: filterString,
        page: this.currentPage,
        limit: this.defaultPageSize,
        order: this.sortOrder,
        keyword: myfilters.keyword,
      };
    }
    this.router.navigate([], {
      relativeTo: this.arouter,
      // tslint:disable-next-line:object-literal-shorthand
      queryParams: queryParams,
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    if (myfilters.keyword != null) {
      // this.keyword = myfilters.keyword;
    }
    this.getProducts(myfilters, 1);
    // this.getProdutFilters(myfilters, changed);
  }

  // tslint:disable-next-line:typedef
  getProducts(
    filterData = {
      attributes: [],
      categories: [],
      brands: [],
      minPrice: 0,
      maxPrice: 9999999999,
    },
    page
  ) {
    this.currentPage = page;
    this.productLoading = true;
    this.products = [];
    this.totalProducts = 0;
    this.productService
      .getCategoryProducts(this.category.id, {
        page: this.currentPage,
        limit: this.defaultPageSize,
        onSale: this.onSale,
        orderBy: this.sortOrder,
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
      categories: [this.category.id],
      brands: [],
      minPrice: 0,
      maxPrice: 9999999999,
    };
    if (filters === null) {
      filters = {
        attributes: [],
        categories: [this.category.id],
        brands: [],
        minPrice: 0,
        maxPrice: 9999999999,
      };
    }
    this.filterLoading = true;
    /*if (changed != 0 && changed != -3 ) {
      filters.minPrice = 0;
      filters.maxPrice = 9999999999;
    }*/
    this.productService
      .categoryProductsFilters(this.category.id, filters)
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
          this.prepareFilters(this.fixedParams);
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
}
