import { Options, LabelType } from '@angular-slider/ngx-slider';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-searchfilters',
  templateUrl: './searchfilters.component.html',
  styleUrls: ['./searchfilters.component.sass']
})
export class SearchfiltersComponent implements OnInit {

  @Input() filtersArray: any;
  @Output() finalData = new EventEmitter();
  filtersForm: UntypedFormGroup;
  formCreated = false;
  finalFilters = [];
  viewMore = -3;
  isBrowser = false;
  windowScrolled = false;
  minValue = 0;
  maxValue = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '$' + value;
        case LabelType.High:
          return '$' + value;
        default:
          return '$' + value;
      }
    }
  };
  constructor(private builder: UntypedFormBuilder, @Inject(PLATFORM_ID) private platformId, @Inject(DOCUMENT) private document: Document) {

    this.isBrowser = isPlatformBrowser(platformId);
   }
   @HostListener('window:scroll', [])
  // tslint:disable-next-line:typedef
  onWindowScroll() {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  // tslint:disable-next-line:typedef
  scrollToTop() {
      // tslint:disable-next-line:typedef
      (function smoothscroll() {
          const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
  }

  ngOnInit(): void {
    //// // console.log('FA' ,this.filtersArray);

    this.minValue = this.filtersArray.minPrice;
    this.maxValue = this.filtersArray.maxPrice;
    this.options = {
      floor: this.filtersArray.minPrice,
      ceil: this.filtersArray.maxPrice,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            return '$' + value;
          case LabelType.High:
            return '$' + value;
          default:
            return '$' + value;
        }
      }
    };
    this.createFiltersForm();
  }
  showMore(i): void {
    if (this.viewMore === i) {
      this.viewMore = -3;
    } else {
      this.viewMore = i;
    }
  }

  createFiltersForm(): void {
    this.filtersForm = this.builder.group({
      categories: this.builder.array([]),
      brands: this.builder.array([]),
      attributes: this.builder.array([]),
    });
   /* if (this.filtersArray.categories) {
      this.filtersForm.addControl('categories', this.builder.array([]) );
    }
    if (this.filtersArray.brands) {
      this.filtersForm.addControl('brands', this.builder.array([]) );
    }*/
    this.formCreated = true;
  }


  onCategoryCheckboxChange(e): void {
    const checkArray: UntypedFormArray = this.filtersForm.get('categories') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onBrandsCheckboxChange(e): void {
    const checkArray: UntypedFormArray = this.filtersForm.get('brands') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onAttributeCheckboxChange(e, att): void {
    const checkArray: UntypedFormArray = this.filtersForm.get('attributes') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl({value: e.target.value, id: att}));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value.id === att && (item.value.value === '' || item.value.value === e.target.value)) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  check(abc) : void {
    // // console.log(abc);
  }
  submitForm(form): void {
    // // // console.log('form', this.filtersForm.value);
    const temp = form.controls.attributes.value;
    // // // console.log('form', temp);
    const attributesFilter = [];
    // tslint:disable-next-line:prefer-for-of
    for ( let k = 0; k < temp.length; k++ ){
      if (attributesFilter[temp[k].id]) {
        attributesFilter[temp[k].id].push(temp[k].value);
      } else {
        attributesFilter[temp[k].id] = [];
        attributesFilter[temp[k].id].push(temp[k].value);
      }
    }
    // // // console.log('make object', attributesFilter);
    const attributeIds = Object.keys(attributesFilter);
    // // // console.log('keys array', attributeIds);
    const attributeArray = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < attributeIds.length; i++) {
      attributeArray.push({
        attribute_id: attributeIds[i],
        attribute_values: attributesFilter[attributeIds[i]]
      });
    }
    const finalFilters = {
      attributes: attributeArray,
      categories: form.controls.categories.value,
      brands: form.controls.brands.value,
      minPrice: this.minValue,
      maxPrice: this.maxValue
    };

    this.finalData.emit(JSON.stringify(finalFilters));
    this.scrollToTop();

  }

}


