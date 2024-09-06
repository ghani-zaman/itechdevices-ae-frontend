import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RxFor } from '@rx-angular/template/for';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ShippingService } from 'src/app/services/shipping.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shipping-calculator',
  templateUrl: './shipping-calculator.component.html',
  styleUrls: ['./shipping-calculator.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RxFor, NgxSmartModalModule]
})
export class ShippingCalculatorComponent implements OnInit {

  @Input() product: any;
  @Input() modelId: any;
  shippirxForm: UntypedFormGroup;
  formCreated = false;
  isDomestic = true;
  loading = false;
  shippinginfo: any = null;
  countriesList = environment.countriesList;
  constructor(private builder: UntypedFormBuilder, private shipService: ShippingService) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.shippirxForm = this.builder.group({
      countryCode: ['US', [Validators.required]],
      postalCode: [null, [Validators.required]]
    });
    this.formCreated = false;
  }
  async submitForm(form): Promise<void> {
    if (form.invalid) {
      return;
    }
    try {
      this.loading = true;
      let weight = 1;
      let weightUnit = 'KG';
      let length = 1;
      let width = 1;
      let height = 1;
      let units = 'IN';
      if (this.product != null && this.product.attributes){
        const weightx = this.product.attributes.filter(attribute => attribute.attribute_id === 604);
        if (weightx.length > 0) {
          weight = weightx[0].attribute_value;
          weightUnit = weightx[0].unit.toUpperCase();
          if (weightUnit === 'G') {
            weightUnit = 'KG';
            weight = weight / 1000;
          }
        }
        const lengthx = this.product.attributes.filter(attribute => attribute.attribute_id === 8);
        if (lengthx.length > 0) {
          length = Math.ceil(lengthx[0].attribute_value);
          units = lengthx[0].unit.toUpperCase();
          if (units === 'INCHES') {
            units = 'IN';
          }
          if (units === 'CENTIMETERS') {
            units = 'CM';
          }
        }
        const widthx = this.product.attributes.filter(attribute => attribute.attribute_id === 9);
        if (widthx.length > 0) {
          width = Math.ceil(widthx[0].attribute_value);
        }
        const heightx = this.product.attributes.filter(attribute => attribute.attribute_id === 10);
        if (heightx.length > 0) {
          height = Math.ceil(heightx[0].attribute_value);
        }
      }
      let result: any;
      const formData = form.value;
      if (formData.countryCode === 'US') {
        this.isDomestic = true;
        result = await this.shipService.fedexDomestic({
          countryCode: formData.countryCode,
          postalCode: formData.postalCode,
          quantity: 1,
          quantityUnit: 'PCS',
          weight,
          weightUnit,
          length,
          width,
          height,
          units,
          product: this.product
        }).toPromise();
      } else {
        this.isDomestic = false;
        result = await this.shipService.fedexInternational({
          countryCode: formData.countryCode,
          postalCode: formData.postalCode,
          quantity: 1,
          quantityUnit: 'PCS',
          weight,
          weightUnit,
          length,
          width,
          height,
          units,
          product: this.product
        }).toPromise();
      }
      if (this.isDomestic) {
        this.shippinginfo = result.data.output.rateReplyDetails;
      }else {
        // // console.log(result);
        this.shippinginfo = result.data.result;
        // // console.log(this.shippinginfo );
      }
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }

}
