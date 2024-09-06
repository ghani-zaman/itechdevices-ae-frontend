import { CommonModule } from '@angular/common';
import { MyToastService } from './../../services/my-toast.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-price-alert',
  templateUrl: './price-alert.component.html',
  styleUrls: ['./price-alert.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  NgxSmartModalModule]
})
export class PriceAlertComponent implements OnInit {
  @Input() product: any;
  @Input() modelId: any;
  form: FormGroup;
  formCreated = false;
  loading = false;
  constructor(
    private toast: MyToastService,
    private productService: ProductService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.builder.group({
      customer_name: [null, [Validators.required]],
      customer_email: [null, [Validators.required, Validators.email]],
      product_id: [this.product.id, [Validators.required]]
    });
    this.formCreated =  true;
  }
  async onSubmit(form): Promise<void> {
    if(form.invalid) {
      return;
    }
    try {
      this.loading = true;
      const resp = await this.productService.sendPriceAlert(form.value);
      if(resp) {
        this.form.reset();
        this.form.clearValidators();
        this.form.controls['product_id'].setValue(this.product.id);
        this.toast.success("Price alert created successfully");
        this.loading = false;
      }
    } catch(e) {
      this.loading = false;
    }
  }
 }
