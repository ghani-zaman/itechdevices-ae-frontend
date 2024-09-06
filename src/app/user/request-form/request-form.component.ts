import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit{
  @Input() user: any=null;
  form !: FormGroup;
  formCreated = false;
  loading = false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private builder: FormBuilder,
    private dataLayerService: DataLayerService,
    private productService: ProductService,
    private toast: MyToastService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) {}
  ngOnInit(): void {
    // console.log(this.user);
    this.createForm();
  }
  createForm() {
    if(isPlatformBrowser(this.platformId)){
    this.form = this.builder.group({
      name: [this.user?.first_name + ' ' + this.user?.last_name , [Validators.required]],
      company: [this.user?.company, []],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [this.user?.phone, [Validators.required]],
      part_number: [null, [Validators.required]],
      url: [sessionStorage.getItem('landing_url')],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    });
    this.formCreated = true;
  }
  }
  async submitForm(form: any) {
    if(this.useCaptcha) {
      await this.captchaRef.execute();
    }else{
      this.submitNow(form);
    }
  }
  async submitNow(form): Promise<void> {
    if(form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error("Kindly enter valid data");
      return;
    }
    try {
      this.loading = true;
      const resp = await this.productService.getRequestForm(form.value);
      if(resp) {
        this.toast.success('Thanks for submitting your query. We will contact you soon');
        this.dataLayerService.logCustomDataEvent({event: 'rfq_form_submission'});
        this.form.reset();
        this.form.clearValidators();
        this.form.markAsUntouched();
        this.form.controls['name'].setValue((this.user != null) ? this.user?.first_name + ' ' + this.user?.last_name : null);
        this.form.controls['company'].setValue((this.user != null) ? this.user?.company : null);
        this.form.controls['email'].setValue((this.user != null) ? this.user?.email : null);
        this.form.controls['phone'].setValue((this.user != null) ? this.user?.phone : null);
      }
      this.loading = false;
    }catch(error) {
      this.loading = false;
    }
  }
}
