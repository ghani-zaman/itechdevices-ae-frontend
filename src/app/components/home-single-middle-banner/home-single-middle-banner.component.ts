import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-single-middle-banner',
  templateUrl: './home-single-middle-banner.component.html',
  styleUrls: ['./home-single-middle-banner.component.sass']
})
export class HomeSingleMiddleBannerComponent implements OnInit {
  loading = true;
  @Input() banners = [];
  path = environment.bannerImagesPath;
  finalBanner = null;
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 10);
    this.banners.reverse();
    const banner1 = this.banners.filter((data) => (data.type === 'bottom_banner'));
    if (banner1.length > 0) {
      this.finalBanner = banner1[0];
    }
  }

}
