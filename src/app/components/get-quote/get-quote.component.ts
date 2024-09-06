import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { DataLayerService } from 'src/app/services/data-layer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.scss'],
})
export class GetQuoteComponent implements OnInit {
  @Input() product: any;
  @Input() modelId: any;
  quoteForm: UntypedFormGroup;
  formCreated = false;
  loading = false;
  constructor(
    private modal: NgxSmartModalService,
    private builder: UntypedFormBuilder,
    private productService: ProductService,
    private toast: ToastrService,
    private dataLayerService: DataLayerService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  openModal(): void {}
  createForm(): void {
    this.quoteForm = this.builder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email,
        //Validators.pattern('^(?!.*(gmail|yahoo|hotmail|outlook)).*$')
      ]
      ],
      phone: [null, []],
      company: [null],
      specifications: [null],
      price: [null],
      quantity: [null],
      product: [null],
    });
    this.formCreated = true;
  }
  submitForm(form): void | boolean {
    if (form.invalid) {
      this.toast.error('Invalid form data');
      return false;
    }
    this.loading = true;
    this.dataLayerService.logCustomDataEvent({event: 'request_quote_submission'});
    this.quoteForm.controls.product.setValue(this.product);
    this.productService.getProductQuotes(form.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.quoteForm.reset();
        this.quoteForm.clearValidators();
        this.toast.success(
          'Thanks for submitting your query. We will contact you soon',
          '',
          { positionClass: 'toast-center-center' }
        );
        this.closeModal();
      },
      (err: any) => {
        this.loading = false;
      }
    );
  }
  closeModal(): void {
    // // console.log(this.product);
    this.modal.close(this.modelId);
  }
}
