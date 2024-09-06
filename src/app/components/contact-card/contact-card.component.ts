import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  form: UntypedFormGroup;
  formCreated = false;
  loading = false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private builder: UntypedFormBuilder,
    private webservice: WebsiteService,
    private toast: MyToastService,
    private router: Router,
    private dataLayerService: DataLayerService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.builder.group({
      firstName: [null, []],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      company: [null, []],
      natureOfBusiness: [null, []],
      part_number: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, []],
      message: [null, [Validators.required]],
      url: [sessionStorage.getItem('landing_url')],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    });
    this.formCreated = true;
  }

  async submitForm(form): Promise<void> {
    if(this.useCaptcha) {
      await this.captchaRef.execute();
    }else{
      this.submitNow(form);
    }
  }
async submitNow(form): Promise<void> {
      if(form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
    try {
      this.loading =  true;
      const resp = await this.webservice.sendContactEmail(form.value);
      if (resp) {
        this.dataLayerService.logCustomDataEvent({event: 'contact_form_submission'});
        this.router.navigate(['pages', 'contact-thank-you'])
        this.toast.success('Thanks for contacting us. We will contact you soon');
        this.form.clearValidators();
        this.form.reset();
        this.loading =  false;
      } else {
      this.form.clearValidators();
      this.form.reset();
      this.loading =  false;
      }
    } catch (err) {
      this.form.clearValidators();
      this.form.reset();
      this.loading =  false;
    }
  }

}
