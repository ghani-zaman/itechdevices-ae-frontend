import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmer.validator';
import { CscService } from 'src/app/services/csc.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';
import { UniqueValidator } from 'src/app/unique.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  businessAccount = false;
  registerForm: UntypedFormGroup;
  formCreated = false;
  registerLoading = false;
  bregisterForm: UntypedFormGroup;
  bformCreated = false;
  bregisterLoading = false;
  returnUrl = '/user';
  showPassword=false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  countriesList: any = [];
  stateList: any = [];
  cityList: any = [];
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  @ViewChild('captchaRefr', {static: false}) captchaRefr: any;
  constructor(
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private toast: MyToastService,
    private router: Router,
    private arouter: ActivatedRoute,
    private csc : CscService,
    private seo: SEOService,
    private title: Title
  ) {
    const rurl = this.arouter.snapshot.queryParams.returnUrl;
    const business = (this.arouter.snapshot.params.id && this.arouter.snapshot.params.id == 'business')? true : false;
    this.businessAccount = business;
    // console.log('business', business);
    if (rurl) {
        this.returnUrl = rurl;
      }
   }

  async ngOnInit(): Promise<void> {
    if(this.businessAccount) {
      this.title.setTitle('Business Sign Up');
    } else {
      this.title.setTitle('Sign Up');
    }
    this.seo.logZendeskEvent();
    this.countriesList = await this.csc.getCountriesList();
    this.createRegisterForm();
    const isAuthenticated = await this.userService.isAuthenticated();
    if (isAuthenticated) {
        this.router.navigateByUrl(this.returnUrl);
      }
  }

  async getStates($event): Promise<any> {

    try{
      if(this.bformCreated){
      this.bregisterForm.controls.state.setValue(null);
      this.bregisterForm.controls.city.setValue(null);
      }
      this.stateList = [];
      this.cityList = [];
      // console.log('country',this.countriesList);
      const country = this.countriesList.filter(c => c.iso2 === $event);
      // console.log('country', country);
      // this.stateList = await this.csc.getStateList(country[0]?.iso2);
      if(country[0]?.iso2 ==='CA' || country[0]?.iso2 ==='US'){
        const state = this.bregisterForm.get('state');
        state.clearValidators();
        state.setValidators([Validators.required]);
        state.updateValueAndValidity();
       this.stateList = await this.csc.getStateList(country[0]?.iso2);
      }else{
        const state = this.bregisterForm.get('state');
        state.clearValidators();
        state.setValidators([]);
        state.updateValueAndValidity();
      }
    } catch (e){
      // console.log(e);
      this.stateList = [];
      this.cityList = [];
    }

  }


  async getCities($event): Promise<void> {
    return;
    try{
      if(this.bformCreated){
      this.bregisterForm.controls.city.setValue(null);
      }
      this.cityList = [];
      this.cityList = await this.csc.getCityList($event);
    } catch (e){
      this.cityList = [];
    }
  }

  async createRegisterForm(data: any = {}): Promise<void> {
    await this.getStates(data.country ? data.country : 'US');
    if (data.state) {
      await this.getCities(data.state);
    }
    this.registerForm = this.builder.group({
      email: [null, [Validators.required, Validators.email], [UniqueValidator(this.userService)]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      newsletter: [false, []],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
    this.formCreated = true;
    this.bregisterForm = this.builder.group({
      email: [null, [Validators.required, Validators.email], [UniqueValidator(this.userService)]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      street_address1: [null, [Validators.required]],
      street_address2: [null, []],
      country: ['US', [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, []],
      zip: [null, [Validators.required]],
      business_type: ['Reseller', [Validators.required]],
      company_name: [null, [Validators.required]],
      job_title: [null, [Validators.required]],
      employee_size: ['1-10 employees', [Validators.required]],
      business_subscriber: [false, []],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
    this.getStates('US');
    this.bformCreated = true

  }

async submitForm(form) : Promise < void > {
  if(this.useCaptcha) {
    await this.captchaRef.execute();
  }else{
    this.submitNow(form);
  }
}
async submitFormRegister(form) : Promise < void > {
  if(this.useCaptcha) {
    await this.captchaRefr.execute();
  }else{
    this.submitNowRegister(form);
  }
}
async submitNowRegister(form): Promise<void> {
  if(form.invalid) {
    this.bregisterForm.markAllAsTouched();
    return;
  }
   try {
    this.registerLoading = true;
    const data = await this.userService.registerBusiness(form.value);
    if (data) {
      // // console.log(data);
      this.toast.success('You are registered successfully. Kindly check your email for confirmation link');
      this.router.navigateByUrl(this.returnUrl);
    }
    this.registerLoading = false;
   } catch (err) {
    this.registerLoading = false;
   }
}
async submitNow(form): Promise<void> {
    if(form.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
     try {
      this.registerLoading = true;
      const data = await this.userService.registerCustomer(form.value);
      if (data) {
        // // console.log(data);
        this.toast.success('You are registered successfully. Kindly check your email for confirmation link');
        this.router.navigateByUrl(this.returnUrl);
      }
      this.registerLoading = false;
     } catch (err) {
      this.registerLoading = false;
     }
  }

personalAccountf(): void {
    this.businessAccount = false;
  }

businessAccountf(): void {
    this.businessAccount = true;
  }

}
