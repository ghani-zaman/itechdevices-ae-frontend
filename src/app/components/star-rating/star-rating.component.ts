import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number;
  @Input() totalRating: number;
  @Input() size: string = 'small';

  get filledStars(): number[] {
    const filledStarsCount = Math.floor(this.rating);
    // console.log(filledStarsCount);
    const remainder = this.rating - filledStarsCount;
    const filledStars = Array(filledStarsCount).fill(1);
    if (remainder > 0 && remainder <= 0.9) {
      filledStars.push(0.5); // Add half-filled star
    } else {
      if(remainder > 0){
      filledStars.push(1);
      } // Add fully filled star
    }

    return filledStars;
  }

  get emptyStars(): number[] {
    const emptyStarsCount = Math.floor(this.totalRating - this.rating);
    // console.log('e', this.rating, emptyStarsCount);
    const emptyStars = Array(emptyStarsCount).fill(1);
    return emptyStars;
  }
}
