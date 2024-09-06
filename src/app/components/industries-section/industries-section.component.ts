import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-industries-section',
  templateUrl: './industries-section.component.html',
  styleUrls: ['./industries-section.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class IndustriesSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
