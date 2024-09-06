import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmedValidator } from 'src/app/confirmer.validator';
import { MyToastService } from 'src/app/services/my-toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  passwordForm: UntypedFormGroup;
  formcreated = false;
  loading = false;
  token = null;
  success = false;
  showPassword=false;
  constructor(
    private userService: UserService,
    private builder: UntypedFormBuilder,
    private toast: MyToastService,
    private router: Router,
    private arouter: ActivatedRoute
  ) {
    this.token = this.arouter.snapshot.queryParams.token;
   }

  async ngOnInit(): Promise<void> {
    this.createForm();
    const isAuthenticated = await this.userService.isAuthenticated();
    if (isAuthenticated) {
        this.router.navigate(['/user']);
    }
    const isTokenValidated = await this.userService.validateForgotPasswordLink(this.token);
    if (!isTokenValidated) {
      this.router.navigate(['/user']);
    }
  }
  createForm(): void {
    this.passwordForm = this.builder.group({
      token: [this.token, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
      }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
    this.formcreated = true;
  }
  async submitForm(form): Promise<void> {
    if (form.invalid) {
      return;
    }
    try {
      this.loading = true;
      const data = await this.userService.resetPassword(form.controls.token.value, form.controls.password.value);
      if (data) {
        this.success = true;
        this.passwordForm.clearValidators();
        this.passwordForm.reset();
      }
      this.loading = false;
    } catch (e) {
      this.loading = false;
    }
  }

  gotoLogin(): void {
    this.router.navigate(['/user/login']);
  }

}
