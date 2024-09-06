import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-category-faq',
  templateUrl: './category-faq.component.html',
  styleUrls: ['./category-faq.component.css']
})
export class CategoryFaqComponent implements OnInit, OnChanges {
  @Input() categoryId: any = null;
  @Input() is_top_menu: boolean = false;
  category: any = null;
  constructor(private websiteService: WebsiteService) {}
  ngOnInit(): void {
    // this.getCategoryFaq();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!this.is_top_menu || (!this.categoryId?.footer_description && this.categoryId?.footer_description !='')){
      this.getCategoryFaq();
    } else {
      this.category = this.categoryId;
    }
  }
  async getCategoryFaq(): Promise<any> {
    // console.log(this.categoryId);
    try {
      this.category = await this.websiteService.getCategoryFaq((this.categoryId?.category_id
        )?this.categoryId.category_id
        : this.categoryId);
      // console.log('faq', this.category)
    } catch (err) {
      this.category = null;
    }
  }
}
