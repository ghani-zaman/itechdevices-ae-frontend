import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/brand.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-ultimate-system-configrator',
  templateUrl: './ultimate-system-configrator.component.html',
  styleUrls: ['./ultimate-system-configrator.component.css']
})
export class UltimateSystemConfigratorComponent implements OnInit {
  ptypes: any[] = [];
  series: any[] = [];
  models: any[] = [];
  form: UntypedFormGroup;
  formCreated =  false;
  loadingBrands = false;
  loadingTypes = false;
  loadingSeries = false;
  loadingModels = false;
  brandsList: any;
  constructor(
    private brandService: BrandService,
    private toastService: MyToastService,
    private builder: UntypedFormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.makeForm();
  }

  makeForm(): void {
    this.form = this.builder.group({
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      series: [null, [Validators.required]],
      model: [null, [Validators.required]]
    });
    this.formCreated = true;
    this.loadBrands();
  }

  trackByMethod(index: number, el: any): string {
    return el.id;
  }

  async loadBrands(): Promise<void> {
    try {
      this.loadingBrands = true;
      this.form.controls.brand.setValue(null);
      this.form.controls.type.setValue(null);
      this.form.controls.series.setValue(null);
      this.form.controls.model.setValue(null);
      this.brandsList = this.brandService.getBrands();
      this.loadingBrands = false;
    } catch (e) {
      this.loadingBrands = false;
      this.toastService.error(e.message);
    }
  }
  async loadTypes(brand): Promise<void> {
    try {
      this.loadingTypes = true;
      this.form.controls.type.setValue(null);
      this.form.controls.series.setValue(null);
      this.form.controls.model.setValue(null);
      const typeList = await this.productService.getProductTypesByBrands(brand).toPromise();
      if (typeList) {
        this.ptypes = typeList.data;
      }
      this.loadingTypes = false;
    } catch (e) {
      this.loadingTypes = false;
      this.toastService.error(e.message);
    }
  }

  async loadTypesSeries(type, brand): Promise<void> {
    try {
      this.loadingSeries = true;
      this.form.controls.series.setValue(null);
      this.form.controls.model.setValue(null);
      const seriesList = await this.productService.getProductSeriesByTypesBrands(type, brand).toPromise();
      if (seriesList) {
        this.series = seriesList.data;
      }
      this.loadingSeries = false;
    } catch (e) {
      this.loadingSeries = false;
      this.toastService.error(e.message);
    }
  }

  async loadTypesSeriesModels(model, type, brand): Promise<void> {
    try {
      this.loadingModels = true;
      this.form.controls.model.setValue(null);
      const modelList = await this.productService.getProductModelBySeriesTypesBrands(model, type, brand).toPromise();
      if (modelList) {
        this.models = modelList.data;
      }
      this.loadingModels = false;
    } catch (e) {
      this.loadingModels = false;
      this.toastService.error(e.message);
    }
  }
  searchNow(form): void {
    if (form.invalid) {
      return;
    }
    this.router.navigate(['/search/model', form.controls.model.value]);
  }

}
