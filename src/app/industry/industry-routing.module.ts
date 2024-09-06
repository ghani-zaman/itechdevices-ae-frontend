import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { FinanceComponent } from './finance/finance.component';
import { EducationComponent } from './education/education.component';
import { GovernmentComponent } from './government/government.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { SmeComponent } from './sme/sme.component';

const routes: Routes = [
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'enterprise',
    component: EnterpriseComponent
  },
  {
    path: 'finance',
    component: FinanceComponent
  },
  {
    path: 'government',
    component: GovernmentComponent
  },
  {
    path: 'healthcare',
    component: HealthcareComponent
  },
  {
    path: 'sme',
    component: SmeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
