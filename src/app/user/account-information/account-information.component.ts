import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfirmedValidator } from 'src/app/confirmer.validator';
import { MyToastService } from 'src/app/services/my-toast.service';
import { UserService } from 'src/app/services/user.service';
import { UniqueValidator } from 'src/app/unique.validator';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.sass'],
})
export class AccountInformationComponent implements OnInit {
  user: any = null;
  loading = false;
  formsCreated = false;
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  phoneForm!: FormGroup;
  showPassword = false;
  eloading = false;
  ploading = false;
  phloading = false;
  constructor(
    private userService: UserService,
    private modal: NgxSmartModalService,
    private builder: FormBuilder,
    private toast: MyToastService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) {}
  async ngOnInit(): Promise<void> {
    this.getUserInfo();
    const seoTitle = 'Account Information | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Itech Devices access and manage your account information effortlessly with our user-friendly Dashboard Overview.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE

  }
  openModal(name: any) {
    if(name == 'editName') {
      this.emailForm.controls['first_name']=this.user.first_name;
      this.emailForm.controls['last_name']=this.user.last_name;
      this.emailForm.controls['email']=this.user.email;
    }
    if(name == 'editPhone') {
      this.phoneForm.controls['phone']=this.user.phone;
    }
    this.modal.open(name);
  }
  closeModal(name: any) {
    this.modal.close(name);
  }
  createForms() {
    this.emailForm = this.builder.group({
      first_name: [this.user?.first_name, [Validators.required]],
      last_name: [this.user?.last_name, [Validators.required]],
      email: [
        this.user?.email,
        [Validators.required, Validators.email],
        [UniqueValidator(this.userService, true)],
      ],
    });
    this.passwordForm = this.builder.group(
      {
        oldpassword: [null, [Validators.required]],
        newpassword: [null, [Validators.required]],
        confirmpassword: [null, [Validators.required]],
      },
      {
        validator: ConfirmedValidator('newpassword', 'confirmpassword'),
      }
    );
    this.phoneForm = this.builder.group({
      phone: [this.user?.phone, [Validators.required]],
    });
    this.formsCreated = true;
  }
  async getUserInfo(): Promise<void> {
    try {
      this.loading = true;
      const resp = await this.userService.getUser();

      // console.log('account information > user', resp);
      this.user = resp;
      this.createForms();
      this.loading = false;
    } catch (err) {
      this.user = null;
      this.loading = false;
    }
  }

  async submitEmailForm(form: any) {
    if (form.invalid) {
      return;
    }
    try {
      this.eloading = true;
      const resp = await this.userService.updateUser(form.value);
      if(resp != false){
      this.user = resp;
      /*this.emailForm.reset();
      this.emailForm.clearValidators();
      this.emailForm.clearAsyncValidators();*/
      this.modal.close('nameEdit');
      this.toast.success('Your information has been updated successfully');
      }
      this.eloading = false;
    } catch (err) {
      this.eloading = false;
    }
  }

  async submitPhoneForm(form: any) {
    if (form.invalid) {
      return;
    }
    try {
      this.phloading = true;
      const resp = await this.userService.updateUser(form.value);
      if(resp != false){
      this.user = resp;
      /*this.emailForm.reset();
      this.emailForm.clearValidators();
      this.emailForm.clearAsyncValidators();*/
      this.modal.close('phoneEdit');
      this.toast.success('Your information has been updated successfully');
    }
      this.phloading = false;
    } catch (err) {
      this.phloading = false;
    }
  }
  async submitPasswordForm(form: any) {
    if (form.invalid) {
      return;
    }
    try {
      this.ploading = true;
      const resp = await this.userService.updateUserPassword(form.value);
      if(resp != false){
      this.user = resp;
      this.passwordForm.reset();
      this.passwordForm.clearValidators();
      /*this.emailForm.clearAsyncValidators();*/
      this.modal.close('passwordEdit');
      this.toast.success('Your information has been updated successfully');
    }
      this.ploading = false;
    } catch (err) {
      this.ploading = false;
    }
  }
}
