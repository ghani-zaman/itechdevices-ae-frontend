import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-all',
  templateUrl: './blog-all.component.html',
  styleUrls: ['./blog-all.component.css'],
})
export class BlogAllComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta, private seo: SEOService) {}

  ngOnInit(): void {
    this.setSeoTags();
  }
  setSeoTags(): void {
    const title =
      'Blog | Itech Devices';
    const description =
      'Explore Itech Devices Blog for expert insights on the latest IT hardware trends, product reviews, and tips to optimize your tech purchases. Stay updated now!';
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:title', content: title });
      this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' });

      this.metaService.updateTag({ property: 'og:image:alt', content: title });
      this.metaService.updateTag({ property: 'og:description', content: description });

      this.metaService.updateTag({ property: 'twitter:title', content: title });
      this.metaService.updateTag({ property: 'twitter:description', content: description });

      this.metaService.updateTag({ property: 'twitter:image:alt', content: title });
      this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image' });
      this.seo.createCanonicalURL();
  }
}
