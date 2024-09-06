import {  Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import { fromEvent,  Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { DOCUMENT } from '@angular/common';
import { DataLayerService } from 'src/app/services/data-layer.service';

@Component({
  selector: 'app-top-smart-search',
  templateUrl: './top-smart-search.component.html',
  styleUrls: ['./top-smart-search.component.css']
})
export class TopSmartSearchComponent implements OnInit {

  results = [];
  isSearching = false;
  subject = new Subject();
  sharedData: any;
  searchTerm = '';
  @ViewChild('productSearchInput', { static: true }) productSearchInput: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(private dataLayerService: DataLayerService, @Inject(DOCUMENT) private document: any, private productService: ProductService, private router: Router) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(event.url) {
          const url = event.url;
          if(url.indexOf('search') === -1) {
            this.productSearchInput.nativeElement.value = '';
            this.hideSearch();
          }
        }
      }

   });
  }

  ngOnInit(): void {
    const tpath = this.document.location.pathname;
    if (tpath.substr(1, 6) === 'search'){
     const pathArray = tpath.split('/');
     this.productSearchInput.nativeElement.value = decodeURIComponent(pathArray[2]);
    }
    fromEvent(this.productSearchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
        this.startSearch(text);

    });

  }
onEnter($event: any): void {
  this.gotoSearchPage();
 }


  startSearch(text): void {
    const path = this.document.location.pathname;
    if (path.substr(1, 6) !== 'search'){
      this.isSearching = true;
      this.productService.searchProductByTitle({name: text, limit: 10}).subscribe((res: any) => {
          this.isSearching = false;
          this.results = res.data;
          if (this.results.length === 0) {
            // this.toast.error('No results found');
          }
        }, (err) => {
          this.isSearching = false;
          this.results = [];
        });
    }
  }

  gotoSearchPage(): void {
    const val = this.productSearchInput.nativeElement.value;
    if(val.length < 1){
      return;
    }
    this.router.navigate(['/search/' + encodeURIComponent(val)]);
    this.hideSearch();
  }

  async openProductPage(item): Promise<void> {
    this.dataLayerService.logCustomDataEvent({event: 'search_bar_item_click'});
    await this.productService.saveSearch(this.productSearchInput.nativeElement.value).toPromise();
    if (item.url && item.url !== null) {
      this.router.navigate(['/' + encodeURIComponent(item.url)]);
    } else {
      this.router.navigate(['/' + item.id]);
    }
    this.hideSearch();
  }

  focusIn(event): void {
    const search  = event.target.value;
    if (search.length > 2) {
      this.startSearch(search);
    }
  }
  hideSearch(): void {
    this.results = [];
    this.isSearching = false;
  }
}

