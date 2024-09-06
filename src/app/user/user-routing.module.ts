import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AccountComponent } from './account/account.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendEmailConfirmationComponent } from './resend-email-confirmation/resend-email-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: 'Login',
        url: ''
      }
    ]
    }
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
    data: {
      title: 'Register',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: 'Sign Up',
        url: ''
      }
    ]
    }
  },

  {
    path: 'sign-up/:id',
    component: RegisterComponent,
    data: {
      title: 'Register',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: 'Sign Up',
        url: ''
      }
    ]
    }
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'resend-email-confirmation',
    component: ResendEmailConfirmationComponent
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Order Invoice',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: '{{tab}}',
        url: '/user/:tab'
        }
      ]
    }
  },
  {
    path: ':tab',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: '{{tab}}',
        url: '/user/:tab'
        }
      ]
    }
  },
  {
    path: ':tab/add-address',
    component: AddAddressComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: '{{tab}}',
        url: '/user/:tab'
        }
      ]
    }
  },
  {
    path: ':tab/edit-address/:id',
    component: AddAddressComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: '{{tab}}',
        url: '/user/:tab'
        }
      ]
    }
  },
  {
    path: ':tab/:id',
    component: AccountComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User',
      breadcrumb: [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'User',
          url: '/user'
        },
        {
        label: '{{tab}}',
        url: '/user/:tab'
        },
        {
          label: '{{tab}}',
          url: '/user/:tab/:id'
          }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
