import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TopHomeSliderComponent } from './top-home-slider/top-home-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
/*import { UltimateSystemConfigratorComponent } from './ultimate-system-configrator/ultimate-system-configrator.component';*/
// import { BrandsLogoSliderComponent } from './brands-logo-slider/brands-logo-slider.component';
import { RouterModule } from '@angular/router';
// import { BestSellingCategoryComponent } from './best-selling-category/best-selling-category.component';
// import { HomeMiddleBannersComponent } from './home-middle-banners/home-middle-banners.component';
// import { BestSellingBrandsComponent } from './best-selling-brands/best-selling-brands.component';
// import { CustomerStoriesComponent } from './customer-stories/customer-stories.component';
// import { HomeSingleMiddleBannerComponent } from './home-single-middle-banner/home-single-middle-banner.component';
// import { HomeTestimonialsComponent } from './home-testimonials/home-testimonials.component';
// import { HomeNewsleterComponent } from './home-newsleter/home-newsleter.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BlockLoaderComponent } from './block-loader/block-loader.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from '../shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { FiltersComponent } from './filters/filters.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SearchfiltersComponent } from './searchfilters/searchfilters.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { ShippingCalculatorComponent } from './shipping-calculator/shipping-calculator.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductCarouselComponent } from './product-carousel/product-carousel.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { ReviewsSliderComponent } from './reviews-slider/reviews-slider.component';
import { BlogSectionComponent } from './blog-section/blog-section.component';
//import { DealsOfWeekComponent } from './deals-of-week/deals-of-week.component';
import { ImageWithTextComponent } from './image-with-text/image-with-text.component';
//import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { BrandsSliderComponent } from './brands-slider/brands-slider.component';
import { ProductListComponent } from './product-list/product-list.component';
//import { TopCategoriesComponent } from './top-categories/top-categories.component';
//import { TopBrandsComponent } from './top-brands/top-brands.component';
import { ProductCardSliderComponent } from './product-card-slider/product-card-slider.component';
import { ProductAccessoriesComponent } from './product-accessories/product-accessories.component';
import { FwCtaComponent } from './fw-cta/fw-cta.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { FeaturedBlogComponent } from './featured-blog/featured-blog.component';
import { MenuItemLiComponent } from './menu-item-li/menu-item-li.component';

import { CategoryFaqComponent } from './category-faq/category-faq.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionDirective, NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BlockLoaderComponent,
    ProductCardComponent,
    FiltersComponent,
    SearchfiltersComponent,
    GetQuoteComponent,
    ProductAttributesComponent,
    ConfirmDialogComponent,
    BlogSectionComponent,
    //DealsOfWeekComponent,
    ImageWithTextComponent,
    //CaseStudiesComponent,
    ProductListComponent,
    //TopCategoriesComponent,
    ProductAccessoriesComponent,
    FwCtaComponent,
    ContactCardComponent,
    FeaturedBlogComponent,
    MenuItemLiComponent,

    CategoryFaqComponent,
  ],
  imports: [
    CommonModule,
    //TopHomeSliderComponent,
    SlickCarouselModule,
    RouterModule,
    SharedModule,
    PipesModule,
    NgxSliderModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturedProductsComponent,
    NgSelectModule,
    //TopBrandsComponent,
    ProductCarouselComponent,
    BrandsSliderComponent,
    ReviewsSliderComponent,
    ProductCardSliderComponent,
    TabsModule.forRoot(),
    ShippingCalculatorComponent,
    NgxSmartModalModule.forRoot(),
    NgbAccordionDirective,
    NgbAccordionModule
  ],
  exports: [
    // TopHomeSliderComponent,
    // BrandsLogoSliderComponent,
    SlickCarouselModule,
    /*UltimateSystemConfigratorComponent,*/
    // BestSellingCategoryComponent,
    // HomeMiddleBannersComponent,
    //BestSellingBrandsComponent,
    //CustomerStoriesComponent,
    //HomeSingleMiddleBannerComponent,
    //HomeTestimonialsComponent,
    //HomeNewsleterComponent,
    BlockLoaderComponent,
    ProductCardComponent,
    FiltersComponent,
    SearchfiltersComponent,
    NgxSmartModalModule,
    GetQuoteComponent,
    ProductCarouselComponent,
    ProductAttributesComponent,
    ConfirmDialogComponent,
    FeaturedProductsComponent,
    ReviewsSliderComponent,
    BlogSectionComponent,
    //DealsOfWeekComponent,
    ImageWithTextComponent,
    //CaseStudiesComponent,
    BrandsSliderComponent,
    ProductListComponent,
    //TopCategoriesComponent,
    //TopBrandsComponent,
    ProductCardSliderComponent,
    ProductAccessoriesComponent,
    FwCtaComponent,
    ContactCardComponent,
    FeaturedBlogComponent,
    MenuItemLiComponent,
    ProductCardSliderComponent,
    NgSelectModule,
    CategoryFaqComponent,
    NgbAccordionDirective,
    NgbAccordionModule
  ]
})
export class ComponentsModule { }
