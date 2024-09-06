import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { WishlistModule } from '../wishlist/wishlist.module';
import { OverviewComponent } from './overview/overview.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResendEmailConfirmationComponent } from './resend-email-confirmation/resend-email-confirmation.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { InvoiceComponent } from './invoice/invoice.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    OrderListComponent,
    AccountSidebarComponent,
    OrderDetailsComponent,
    OverviewComponent,
    AccountInformationComponent,
    ReturnRequestComponent,
    AddAddressComponent,
    AddressComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    ResendEmailConfirmationComponent,
    RequestFormComponent,
    InvoiceComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    WishlistModule,
    NgSelectModule,
  ]
})
export class UserModule { }
