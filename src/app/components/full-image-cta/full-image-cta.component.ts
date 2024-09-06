import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import {  RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MyToastService } from 'src/app/services/my-toast.service';
import { WebsiteService } from 'src/app/services/website.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-image-cta',
  templateUrl: './full-image-cta.component.html',
  styleUrls: ['./full-image-cta.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule]
})
export class FullImageCtaComponent implements OnInit {

  /*constructor(private renderer: Renderer2, private el: ElementRef) {

  }

  private observeIframeSrcChanges(iframe: HTMLIFrameElement): void {
    const observer = new MutationObserver((e) => {
      this.onIframeSrcChange(e);
    });

    observer.observe(iframe, {
      attributes: true,
      attributeFilter: ['src'],
    });
  }

  private onIframeSrcChange(e): void {
    // Call your Angular app function here
    console.log('srcchnaged', e)
  }

  ngOnInit(): void {
    const iframe = this.el.nativeElement.querySelector('iframe');
    this.observeIframeSrcChanges(iframe);
  }*/

  form: UntypedFormGroup;
  formCreated = false;
  loading = false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  isBrowser = false;
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private builder: UntypedFormBuilder,
    private webservice: WebsiteService,
    private toast: MyToastService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    if(this.isBrowser) {
    this.form = this.builder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      part_number: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      company: [null, []],
      url: [sessionStorage.getItem('landing_url')],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    });
    this.formCreated = true;
    }
  }

  async submitForm(form: any): Promise<void> {
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
      const resp = await this.webservice.sendFrontContactEmail(form.value);
      if (resp) {
        this.router.navigate(['pages', 'rfq-thank-you']);
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
