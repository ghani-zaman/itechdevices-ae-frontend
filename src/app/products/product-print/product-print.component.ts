import { Component, Input, OnInit, Inject,
  PLATFORM_ID, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
/*import { NgxBarcode6Module } from 'ngx-barcode6';*/
import { RxFor } from '@rx-angular/template/for';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-product-print',
  templateUrl: './product-print.component.html',
  styleUrls: ['./product-print.component.css'],
  standalone: true,
  imports: [CommonModule,  RxFor, /*NgxBarcode6Module,*/ PipesModule]
})
export class ProductPrintComponent implements OnInit {
  @Input() product: any = null;
  attribLoading = false;
  groupHeaders: any = [];
  otherAtts = [];
  otherJoints = [];

  condition = 'refurbished_grade_a_price';

  imagespath = environment.imagesPath;
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private productService: ProductService) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    // // console.log('product', this.product);
  }
  loadGroupHeaders(id): void {
    this.productService.getAttributeHeaders(id).subscribe(
      (res: any) => {
        this.groupHeaders = res.data;
        if (this.groupHeaders.length > 0) {
          this.otherAtts = [];
          this.otherJoints = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.groupHeaders.length; i++) {
            const atts = this.groupHeaders[i].attributes.split(',');
            this.otherAtts.push(...atts);
            const jatts = this.groupHeaders[i].joint_attributes.split(',');
            this.otherJoints.push(...jatts);
          }
          this.otherAtts = this.otherAtts.filter((value) => value !== '');
          this.otherAtts = this.otherAtts.map((value) => parseInt(value, 10));
          this.otherJoints = this.otherJoints.filter((value) => value !== '');
          this.otherJoints = this.otherJoints.map((value) =>
            parseInt(value, 10)
          );
          const patts = this.product.attributes.map(
            (attr) => attr.attribute_id
          );
          const pjatts = this.product.jattributes.map((attr) => attr.id);
          const otherAttsFinals = patts.filter(
            (x) => !this.otherAtts.includes(x)
          );
          const otherJAttsFinals = pjatts.filter(
            (x) => !this.otherJoints.includes(x)
          );
          // tslint:disable-next-line:max-line-length
          this.groupHeaders.push({
            id: 0,
            title: 'Others',
            attributes: otherAttsFinals.join(','),
            joint_attributes: otherJAttsFinals.join(','),
          });
        }
      },
      (err: any) => {}
    );
  }


}
