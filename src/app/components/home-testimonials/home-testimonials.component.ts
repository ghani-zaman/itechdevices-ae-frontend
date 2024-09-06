import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-testimonials',
  templateUrl: './home-testimonials.component.html',
  styleUrls: ['./home-testimonials.component.sass']
})
export class HomeTestimonialsComponent implements OnInit {

  slideConfig = {
    dots: false,
    vertical: false,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  constructor() { }

  ngOnInit(): void {
  }

}
