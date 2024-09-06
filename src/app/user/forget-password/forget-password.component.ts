import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyToastService } from 'src/app/services/my-toast.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {

  passwordForm: UntypedFormGroup;
  formcreated = false;
  loading = false;
  siteKey = environment.googleSiteKey;
  useCaptcha = environment.useCaptcha;
  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  constructor(
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private toast: MyToastService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.createForm();
    const isAuthenticated = await this.userService.isAuthenticated();
    if (isAuthenticated) {
        this.router.navigate(['/user']);
      }
  }

  createForm(): void {
    this.passwordForm = this.builder.group({
      email: [null, [Validators.required, Validators.email]],
      recaptchaReactive: [null, (this.useCaptcha)? [Validators.required] : []],
    });
    this.formcreated = true;
  }

  async submitForm(form): Promise<void> {
    if(this.useCaptcha) {
      await this.captchaRef.execute();
    }else{
      this.submitNow(form);
    }
  }
  async submitNow(form): Promise<void> {
    if (form.invalid) {
      this.passwordForm.markAllAsTouched()
      return;
    }
    try {
      this.loading = true;
      const data = await this.userService.sendForgotPasswordLink(form.value);
      if (data) {
        this.toast.success('Kindly check  your email for password reset link');
        this.passwordForm.clearValidators();
        this.passwordForm.reset();
        ;
      }
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }


}
