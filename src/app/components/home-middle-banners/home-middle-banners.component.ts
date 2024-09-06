import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-middle-banners',
  templateUrl: './home-middle-banners.component.html',
  styleUrls: ['./home-middle-banners.component.sass']
})
export class HomeMiddleBannersComponent implements OnInit {
  loading = true;
  @Input() banners = [];
  path = environment.bannerImagesPath;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 10);

    const banner1 = this.banners.filter((data) => (data.type === 'body_banner_1'));
    const banner2 = this.banners.filter((data) => (data.type === 'body_banner_2'));
    const banner3 = this.banners.filter((data) => (data.type === 'body_banner_3'));
    this.banners = [];
    if (banner1.length > 0) {
      this.banners.push(banner1[0]);
    }
    if (banner2.length > 0) {
      this.banners.push(banner2[0]);
    }
    if (banner3.length > 0) {
      this.banners.push(banner3[0]);
    }
    // // console.log(this.banners);
  }

}
