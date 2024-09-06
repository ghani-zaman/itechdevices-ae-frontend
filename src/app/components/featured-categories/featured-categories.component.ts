import { environment } from 'src/environments/environment';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/services/website.service';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-featured-categories',
  templateUrl: './featured-categories.component.html',
  styleUrls: ['./featured-categories.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LazyLoadImageModule]
})
export class FeaturedCategoriesComponent implements OnInit {
  data: any = [];
  loading = false;
  imagesPath = environment.imagesPath;
  constructor(
    private websiteService: WebsiteService
  ) { }

  ngOnInit(): void {
    this.getFeaturedCategories();
  }

  async getFeaturedCategories(): Promise<void> {
    try {

      this.data = this.websiteService.getFeaturedCategories() || [];
      // console.log('featuredcategories', this.data);

    }catch (err) {
      this.data = [];
      this.loading = false;
    }
  }

  trackByMethod(index: number, el: any): string {
    return el.key;
  }

  trackByMethod1(index: number, el: any): string {
    return el.id;
  }
}
