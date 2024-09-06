import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared.module';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RESPONSE } from 'src/express.tokens';
import { Response } from 'express';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { MyToastService } from 'src/app/services/my-toast.service';
@Component({
  selector: 'app-rfq-form',
  templateUrl: './rfq-form.component.html',
  styleUrls: ['./rfq-form.component.css'],
  standalone: true,
  imports: [CommonModule, ComponentsModule, SharedModule],
})
export class RfqForm implements OnInit {
  quoteForm: UntypedFormGroup;
  isBrowser = false;
  useCaptcha = environment.useCaptcha;
  formCreated = false;
  quoteloading = false;
  product: any = null;
  siteKey = environment.googleSiteKey;
  private response: Response;
  @ViewChild('captchaRef', { static: false }) captchaRef: any;
  constructor(
    private title: Title,
    private meta: Meta,
    private seo: SEOService,
    @Inject(PLATFORM_ID) private platformId,
    @Optional() @Inject(RESPONSE) response: any,
    private dataLayerService: DataLayerService,
    private builder: UntypedFormBuilder,
    private productService: ProductService,
    private router: Router,
    private toast: MyToastService
  ) {
    this.response = response;
    // console.log(this.response);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const seoTitle = 'Request For Quote | Itech Devices';
    this.title.setTitle(seoTitle);
    this.meta.updateTag({
      name: 'description',
      content:
        'Find out the top-notch IT hardware for businesses and data centers switches, Explore our wide selection to optimize your infrastructure and drive success!',
    });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
    this.seo.logZendeskEvent();
    if(this.isBrowser) {
      this.product = JSON.parse(localStorage.getItem('getQuoteProduct'));
      if(!this.product) {
        this.router.navigate(['/']);
      }
      this.createQuoteForm();
    }

    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  createQuoteForm(): void {
    if (this.isBrowser) {
      this.quoteForm = this.builder.group({
        name: [null],
        lastName: [null, [Validators.required]],
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            //Validators.pattern('^(?!.*(gmail|yahoo|hotmail|outlook)).*$'),
          ],
        ],
        phone: [null, []],
        // company: [null],
        // specifications: [null],
        price: [null, []],
        quantity: [1, [Validators.required, Validators.pattern('^[0-9 ]+$')]],
        product: [null],
        condition: [null],
        brand: [null],
        category: [null],
        url: [sessionStorage.getItem('landing_url')],
        recaptchaReactive: [null, this.useCaptcha ? [Validators.required] : []],
      });
      this.formCreated = true;
    }
  }
  async submitQuoteForm(form) {
    if (this.useCaptcha) {
      await this.captchaRef.execute();
    } else {
      this.submitNow(form);
    }
  }
  async submitNow(form): Promise<void> {
    if (form.invalid) {
      this.quoteForm.markAllAsTouched();
      // this.toast.error('Invalid form data');
      return;
    }
    this.quoteloading = true;
    this.quoteForm.controls.product.setValue(this.product);
    this.quoteForm.controls.price.setValue(
      this.product[this.product.condition]
    );
    this.quoteForm.controls.brand.setValue(this.product.brand_name);
    this.quoteForm.controls.condition.setValue(this.product.condition);
    this.quoteForm.controls.category.setValue(this.product.category_name);
    this.dataLayerService.logCustomDataEvent({
      event: 'request_quote_submission',
    });
    this.quoteForm.controls.product.setValue(this.product);
    this.productService.getProductQuotes(form.value).subscribe(
      (res: any) => {
        this.quoteloading = false;
        this.quoteForm.reset();
        this.quoteForm.clearValidators();
        this.quoteForm.markAsUntouched();
        this.router.navigate(['pages', 'rfq-thank-you']);
        localStorage.removeItem('getQuoteProduct');
        this.toast.success(
          'Thanks for submitting your query. We will contact you soon'
        );
      },
      (err: any) => {
        this.quoteloading = false;
      }
    );
  }
}
