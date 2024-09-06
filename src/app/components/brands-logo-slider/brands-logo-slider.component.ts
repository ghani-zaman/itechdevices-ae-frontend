import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-logo-slider',
  templateUrl: './brands-logo-slider.component.html',
  styleUrls: ['./brands-logo-slider.component.sass']
})
export class BrandsLogoSliderComponent implements OnInit {

  slideConfig = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 300,
    slidesToShow: 6,
    nav: true,
    slidesToScroll: 1,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
