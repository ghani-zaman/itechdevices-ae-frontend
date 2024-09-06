import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jsonld',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jsonld.component.html',
  styleUrl: './jsonld.component.css',
  host: {ngSkipHydration: 'true'},
})
export class JsonldComponent {
  @Input() data: any = null
}
