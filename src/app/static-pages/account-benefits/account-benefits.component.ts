import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { IndustriesSectionComponent } from 'src/app/components/industries-section/industries-section.component';
import { SharedModule } from 'src/app/shared.module';


@Component({
  selector: 'app-account-benefits',
  templateUrl: './account-benefits.component.html',
  styleUrls: ['./account-benefits.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    RouterModule,
    IndustriesSectionComponent
  ]
})
export class AccountBenefitsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
