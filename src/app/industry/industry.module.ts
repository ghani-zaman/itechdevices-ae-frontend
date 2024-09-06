import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndustryRoutingModule } from './industry-routing.module';
import { DetailsComponent } from './details/details.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { SmeComponent } from './sme/sme.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { GovernmentComponent } from './government/government.component';
import { FinanceComponent } from './finance/finance.component';
import { EducationComponent } from './education/education.component';


@NgModule({
  declarations: [
    DetailsComponent,
    EnterpriseComponent,
    SmeComponent,
    HealthcareComponent,
    GovernmentComponent,
    FinanceComponent,
    EducationComponent
  ],
  imports: [
    CommonModule,
    IndustryRoutingModule,
    SharedModule,
    ComponentsModule,
    // PipesModule,
    LazyLoadImageModule
  ]
})
export class IndustryModule { }
