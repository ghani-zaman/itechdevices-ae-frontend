import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy-now-cta',
  templateUrl: './buy-now-cta.component.html',
  styleUrls: ['./buy-now-cta.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule]
})
export class BuyNowCtaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
