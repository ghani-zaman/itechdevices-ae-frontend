import { Options, LabelType } from '@angular-slider/ngx-slider';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, UntypedFormControl } from '@angular/forms';

import { slideInLeftOnEnterAnimation } from 'angular-animations';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  animations: [slideInLeftOnEnterAnimation({ anchor: 'slidein' })],
})
export class FiltersComponent implements OnInit {
  @Input() filtersArray: any;
  @Input() currentFilters: any = [];
  @Input() allCats: any = [];
  @Input() type: any = null;
  @Input() typeid: any = 0;
  @Output() finalData = new EventEmitter();
  excluded: any = [];
  filtersForm: UntypedFormGroup;
  formCreated = false;
  finalFilters = [];
  viewMore = -3;
  isBrowser = false;
  windowScrolled = false;
  minValue = 0;
  maxValue = 9999999999;
  showSelected = false;
openform = true;
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
    },
  };

  selectedFiltersx = [];
  constructor(
    private builder: UntypedFormBuilder,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private webService: WebsiteService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  @HostListener('window:scroll', [])
  // tslint:disable-next-line:typedef
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  // tslint:disable-next-line:typedef
  scrollToTop() {
    // tslint:disable-next-line:typedef
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }

  isInteger(value: any): boolean {

    return Number.isInteger(+value);
  }
  showSelectedFilters() {
    if(!this.showSelected) {
    this.showSelected = true;
    this.cdr.detectChanges();
    }
  }

  removeSelectedFilter(type,id,value, attype = null) {
    console.log(attype);
    if(type=='attribute') {
      const checkArray: UntypedFormArray = this.filtersForm.get(
        'attributes'
      ) as UntypedFormArray;
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (
          item.value.id == id &&
           item.value.value === value
        ) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
      if(attype == 'DropDown' || attype == 'TextBox'){
        const data: any = this.document.getElementById('attid'+id);
        if(data){
          data.value=null;
        }
      }
      if(attype == 'Multi-Select-DropDown'){
        var option: any = document.querySelector('option[value="' + value + '"]');
        if (option) {
          option.selected = !option.selected;
        }
      }
      if(attype == 'CheckBox'){
        var option: any = document.querySelector('option[value="' + value + '"]');
        if (option) {
          option.checked = !option.checked;
        }
      }
    }
    if(type=='category') {
      const checkArray: UntypedFormArray = this.filtersForm.get(
        'categories'
      ) as UntypedFormArray;
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
      var option: any = document.getElementById('cat'+ value);
        if (option) {
          option.checked = !option.checked;
        }
    }
    if(type=='brand') {
      const checkArray: UntypedFormArray = this.filtersForm.get(
        'brands'
      ) as UntypedFormArray;
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
      var option: any = document.getElementById('brand'+ value);
        if (option) {
          option.checked = !option.checked;
        }
    }
    //if(this.showSelected) {
      this.showSelected = false;
      // this.cdr.detectChanges()
    //}
    this.submitForm(this.filtersForm, 1);
  }

  createSelectedFiltersComponent(obj1, obj2) {
    const selectedFilters = [];

    // Process attributes
    if (obj2.attributes) {
      for (const attrId in obj2.attributes) {
        const attribute = obj1.attributes.find(attr => attr.attribute_id.toString() === attrId);

        if (attribute) {
          const values = obj2.attributes[attrId];
          const selectedValues = values.map(value => {
            const attributeValue = attribute.attribute_values.find(val => val.value === value);
            return attributeValue ? attributeValue.value : value;
          });

          selectedFilters.push({
            type: 'attribute',
            atttype: attribute.attribute_type,
            id: attribute.attribute_id,
            title: attribute.attribute_title,
            values: selectedValues,
          });
        }
      }
    }

    // Process categories
    if (obj2.categories) {
      const categoryNames = obj2.categories.map(catId => {
        const category = obj1.categories.find(cat => cat.id.toString() === catId);
        return category ? category.name +'|||'+catId : catId+'|||'+catId;
      });

      selectedFilters.push({
        type: 'category',
        values: categoryNames,
      });
    }

    // Process brands
    if (obj2.brands) {
      const brandNames = obj2.brands.map(brandId => {
        const brand = obj1.brands.find(b => b.id.toString() === brandId);
        return brand ? brand.name +'|||'+ brandId : brandId+'|||'+brandId;
      });

      selectedFilters.push({
        type: 'brand',
        values: brandNames,
      });
    }

    return selectedFilters;
  }
  recalculateSelectedFilters() {
    this.selectedFiltersx = this.createSelectedFiltersComponent(this.filtersArray, this.currentFilters );
  }

  checkExcluded(id) {
    try{
      const excludedx = (JSON.parse(this.excluded))? JSON.parse(this.excluded) : [];
      // console.log(Array.isArray(excludedx));
      if(excludedx.length > 0) {
        if(excludedx.includes(+id)) {
          return true;
        }else{
          return false;
        }
    } else {
      return false;
    }
    }catch(err) {
      return false;
    }

  }

  async ngOnInit(): Promise<void> {
    const resp: any = await this.webService.getExcluded();
    this.excluded = (resp) ? resp: [];
    this.recalculateSelectedFilters();
    // console.log('selected', selectedFilters);
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
      },
    };
    this.createFiltersForm();
   if(this.isBrowser){
      this.openform = false
   }
  }
  showMore(i): void {
    if (this.viewMore === i) {
      this.viewMore = -3;
    } else {
      this.viewMore = i;
    }
  }

  createFiltersForm(): void {
    // // console.log("jagoo", this.currentFilters);
    const data = this.currentFilters.name ? this.currentFilters.name : null;
    this.filtersForm = this.builder.group({
      name: [data],
      categories: this.builder.array([]),
      brands: this.builder.array([]),
      attributes: this.builder.array([]),
    });
    // const jObject = JSONObject(this.currentFilters);
    if (this.currentFilters.hasOwnProperty('attributes')) {
      const checkArray: UntypedFormArray = this.filtersForm.get(
        'attributes'
      ) as UntypedFormArray;
      for (const [key, value] of Object.entries(
        this.currentFilters.attributes
      )) {
        const temp: any = value;
        const tmpstr = temp.join(', ');
        checkArray.push(new UntypedFormControl({ value: tmpstr, id: key }));
      }
    }

    if (
      this.currentFilters.hasOwnProperty('categories') &&
      this.currentFilters.categories.length > 0
    ) {
      const checkArray1: UntypedFormArray = this.filtersForm.get(
        'categories'
      ) as UntypedFormArray;
      // tslint:disable-next-line:forin
      for (const cat in this.currentFilters.categories) {
        checkArray1.push(new UntypedFormControl(this.currentFilters.categories[cat]));
      }
    }

    if (
      this.currentFilters.hasOwnProperty('brands') &&
      this.currentFilters.brands.length > 0
    ) {
      const checkArray2: UntypedFormArray = this.filtersForm.get(
        'brands'
      ) as UntypedFormArray;
      // tslint:disable-next-line:forin
      for (const cat in this.currentFilters.brands) {
        checkArray2.push(new UntypedFormControl(this.currentFilters.brands[cat]));
      }
    }
    /* if (this.filtersArray.categories) {
      this.filtersForm.addControl('categories', this.builder.array([]) );
    }
    if (this.filtersArray.brands) {
      this.filtersForm.addControl('brands', this.builder.array([]) );
    }*/
    // console.log(this.filtersArray);
    this.formCreated = true;
  }

  onCategoryCheckboxChange(e): void {
    const checkArray: UntypedFormArray = this.filtersForm.get(
      'categories'
    ) as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitForm(this.filtersForm, -2);
  }

  onBrandsCheckboxChange(e): void {
    const checkArray: UntypedFormArray = this.filtersForm.get('brands') as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitForm(this.filtersForm, -1);
  }
  onAttributeCheckboxChange(e, att): void {
    // // console.log(e);
    //  // console.log(att);
    const checkArray: UntypedFormArray = this.filtersForm.get(
      'attributes'
    ) as UntypedFormArray;
    if (e.target.checked) {
      checkArray.push(new UntypedFormControl({ value: e.target.value, id: att }));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: UntypedFormControl) => {
        if (
          item.value.id == att &&
          (item.value.value === '' || item.value.value === e.target.value)
        ) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.submitForm(this.filtersForm, att);
  }
  onTextBoxChage(e, att): void {
    // // console.log('event', e.target.value);
    // // console.log('att', att);
    const checkArray: UntypedFormArray = this.filtersForm.get(
      'attributes'
    ) as UntypedFormArray;
    let i = 0;
    checkArray.controls.forEach((item: UntypedFormControl) => {
      if (item.value.id == att) {
        checkArray.removeAt(i);
      }
      i++;
    });
    // tslint:disable-next-line:triple-equals
    if (e.target.value != null && e.target.value != 'null') {
      checkArray.push(
        new UntypedFormControl({ value: e.target.value, id: att, type: 'textbox' })
      );
    }
    this.submitForm(this.filtersForm, att);
  }
  onSelectDropDownChange(e, att): void {
    const checkArray: UntypedFormArray = this.filtersForm.get(
      'attributes'
    ) as UntypedFormArray;
    let i = 0;
    // // console.log(checkArray.controls);
    checkArray.controls.forEach((item: UntypedFormControl) => {
      if (item.value.id == att) {
        checkArray.removeAt(i);
      }
      i++;
    });
    // tslint:disable-next-line:triple-equals
    if (e.target.value != null && e.target.value != 'null') {
      checkArray.push(
        new UntypedFormControl({ value: e.target.value, id: att, type: 'select' })
      );
    }
    this.submitForm(this.filtersForm, att);
  }

  priceChange(e: any): void {
    // this.minValue = e.value;
    // this.maxValue = e.highValue;
    this.submitForm(this.filtersForm, 0);
  }
  onSelectMultiDropDownChange(e, att): void {
    let options: any = [];
    for (let i = 0; i < e.target.selectedOptions.length; i++) {
      options[i] = e.target.selectedOptions[i].value;
    }
    const optionstring = options.join(',');

    const checkArray: UntypedFormArray = this.filtersForm.get(
      'attributes'
    ) as UntypedFormArray;
    let i = 0;
    checkArray.controls.forEach((item: UntypedFormControl) => {
      if (item.value.id == att) {
        checkArray.removeAt(i);
      }
      i++;
    });
    // tslint:disable-next-line:triple-equals
    /*if (optionstring != '') {
      checkArray.push(
        new UntypedFormControl({ value: optionstring, id: att, type: 'multiselect' })
      );
    }*/
    for (let i = 0; i < e.target.selectedOptions.length; i++) {
      checkArray.push(
        new UntypedFormControl({ value: e.target.selectedOptions[i].value, id: att, type: 'multiselect' })
      );
    }
    this.submitForm(this.filtersForm, att);
  }
  check(abc): void {
    // // console.log(abc);
  }
  submitForm(form, changed = 0): void {
    console.log('form', form.controls.attributes.value);

    const outputObject = {};
    const  inputArray = form.controls.attributes.value;
    inputArray.forEach(item => {
      if (item.id) {
        if (!outputObject[item.id]) {
          outputObject[item.id] = [];
        }
        outputObject[item.id].push(item.value);
      }
    });
    this.selectedFiltersx = this.createSelectedFiltersComponent(this.filtersArray, {
      categories: form.controls.categories.value,
      brands: form.controls.brands.value,
      attributes: outputObject
    })

    const temp = form.controls.attributes.value;
    const attributesFilter = [];
    const attributeType = [];
    // tslint:disable-next-line:prefer-for-of
    for (let k = 0; k < temp.length; k++) {
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
        attribute_values: attributesFilter[attributeIds[i]],
      });
    }
    const finalFilters = {
      attributes: attributeArray,
      categories: form.controls.categories.value,
      brands: form.controls.brands.value,
      keyword: form.controls.name.value,
      minPrice: this.minValue,
      maxPrice: this.maxValue,
    };
    this.finalData.emit(JSON.stringify({ filters: finalFilters, changed }));
    //this.scrollToTop();
  }

  isObject(val): boolean {
    // // // console.log('Val', val);
    return typeof val === 'object';
  }
}
