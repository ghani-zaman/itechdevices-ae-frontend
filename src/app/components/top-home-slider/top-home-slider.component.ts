import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-home-slider',
  templateUrl: './top-home-slider.component.html',
  styleUrls: ['./top-home-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, RxFor, NgOptimizedImage],

})
export class TopHomeSliderComponent implements OnInit {
  loading = true;
  @Input() banners: any = [];
  @Input() bannersMob = [];
  path = environment.bannerImagesPath;
  siteUrl = environment.siteUrl;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.banners);
  }
  trackByMethod(index:number, el:any): number {

    return el.id;
  }
}
