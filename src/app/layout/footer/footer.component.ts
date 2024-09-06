import { JsonldService } from 'src/app/services/jsonld.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { NewsletterService } from 'src/app/services/newsletter.service';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JsonldComponent } from 'src/app/jsonld/jsonld.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    JsonldComponent
  ]
})
export class FooterComponent implements OnInit {
  loading = false;
  form: UntypedFormGroup;
  formCreated =  false;
  fdate = new Date();
  checkout = false;
  webjson: any = {};
  webjson1: any = {};
  orgjson: any = {};
  orgjson1: any = {};
  constructor(
    private newsletterService: NewsletterService,
    private builder: UntypedFormBuilder,
    private toast: MyToastService,
    private dataLayerService: DataLayerService,
    private jsonld: JsonldService,
    private router: Router  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // console.log('revent', event);
      const isCheckout = (event.url.indexOf('checkout') > -1) ? true : false;
      this.checkout = isCheckout;
      //Do something with the NavigationEnd event object.
    });
   }

  ngOnInit(): void {
    this.createForm();
    this.webjson = this.jsonld.getWebsiteJson();
    //this.webjson1 = this.jsonld.getWebsiteJson1();
    //this.orgjson = this.jsonld.getOrgJson();
    this.orgjson1 = this.jsonld.getOrgJson1();
  }

  createForm(): void {
    this.form = this.builder.group({
      email: [null, [Validators.required, Validators.email]]
    });
    this.formCreated = true;
  }

  async submitForm(form: any): Promise<any> {
    if (form.invalid) {
      return false;
    }
    try{
      this.loading = true;
      const resp = await this.newsletterService.subscribe(form.value);
      if (resp) {
        this.toast.success(resp);
        this.dataLayerService.logCustomDataEvent({event: 'newsletter_subscribed'});
      }
      this.loading = false;
      this.form.reset();
      this.form.clearValidators();
    } catch (e){
      this.loading = false;
    }
  }

}
