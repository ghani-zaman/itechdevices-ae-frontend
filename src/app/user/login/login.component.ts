import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MyToastService } from 'src/app/services/my-toast.service';
import { SEOService } from 'src/app/services/seo.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  formCreated = false;
  loginLoading = false;
  returnUrl = '/user';
  showPassword= false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private toast: MyToastService,
    private router: Router,
    private arouter: ActivatedRoute,
    private seo: SEOService,
    private title: Title
  ) {
    const rurl = this.arouter.snapshot.queryParams.returnUrl;
    if (rurl) {
        this.returnUrl = rurl;
      }
   }

  async ngOnInit(): Promise<void> {
    this.title.setTitle('Login');
    this.seo.logZendeskEvent();
    this.createLoginForm();
    const isAuthenticated = await this.userService.isAuthenticated();
    if (isAuthenticated) {
        this.router.navigateByUrl(this.returnUrl);
      }
  }

  createLoginForm(): void {
    this.loginForm = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    });
    this.formCreated = true;
  }

  async submitForm(form): Promise<void> {
    if(this.useCaptcha) {
      this.captchaRef.execute();
    }else{
      this.submitNow(form);
    }
  }
  async submitNow(form): Promise<void> {
    if(form.invalid) {
      console.log('invalid');
      this.loginForm.markAllAsTouched();
      return;
    }
     try {
      this.loginLoading = true;
      const data = await this.userService.login(form.value);
      if (data) {
        // // console.log(data);
        this.toast.success('You are logged in successfully');
        this.router.navigateByUrl(this.returnUrl);
      }
      this.loginLoading = false;
     } catch (err) {
      this.loginLoading = false;
     }
  }

}
