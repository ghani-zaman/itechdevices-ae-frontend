import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { TopSmartSearchComponent } from './top-smart-search/top-smart-search.component';
import { TopCartComponent } from './top-cart/top-cart.component';
import { TopUserComponent } from './top-user/top-user.component';
// import { TopMainMenuComponent } from './top-main-menu/top-main-menu.component';
// import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared.module';
/*import { SecondaryMenuComponent } from './secondary-menu/secondary-menu.component';*/
// import { JsonldComponent } from '../jsonld/jsonld.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { TopMainMenuComponent } from './top-main-menu/top-main-menu.component';

@NgModule({
  declarations: [
    TopBarComponent,
    TopHeaderComponent,
    TopSmartSearchComponent,
    TopCartComponent,
    TopUserComponent,
    // TopMainMenuComponent,
    //FooterComponent,
    /*SecondaryMenuComponent,*/
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    /*ComponentsModule,
    SharedModule,*/
    TopMainMenuComponent,
    RxFor,
    RxIf,
  ],
  exports: [
    TopBarComponent,
    TopHeaderComponent,
    // TopMainMenuComponent,
    //FooterComponent,
    NgbModule,
    RxFor,
    RxIf,
  ],
})
export class LayoutModule {}
