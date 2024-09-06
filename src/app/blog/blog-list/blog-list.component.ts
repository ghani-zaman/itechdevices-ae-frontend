import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { environment } from 'src/environments/environment';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  singlePost: any;
  slug: string;
  imageurl = environment.imagesPath + 'Images/Blogs/';
  blogurl = environment.siteUrl + '/blog/';
  constructor(
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private seo: SEOService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('url') as string;
    this.getSinglePost();
    this.route.url.subscribe((res: any) => {
      // console.log(res);
      if(res[0] && res[0].path) {
        this.slug = this.route.snapshot.paramMap.get('url') as string;
        this.getSinglePost();
      }
    })
  }

  setSeoTags(post): void {
    const title = (post.meta_title != null) ? post.meta_title : 'Memory Clearance | Top Quality IT Solutions & Products - Memory Clearance';
    const description = (post.meta_description != null) ? post.meta_description : '';
    const image = (post.blog_image) ?  this.imageurl + post.blog_image : null;
    const url = (post.url) ? environment.siteUrl + 'blog/' + post.url : null;
    this.titleService.setTitle(post.meta_title);
    this.metaService.updateTag({ name: 'robots', content: environment.robots });
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ property: 'og:title', content: title});
      this.metaService.updateTag({ property: 'og:type', content: 'image/jpeg' });
      this.metaService.updateTag({ property: 'og:image', content: image});
      this.metaService.updateTag({ property: 'og:image:alt', content: title});
      this.metaService.updateTag({ property: 'og:description', content: description});
      this.metaService.updateTag({ property: 'og:url', content: url});
      this.metaService.updateTag({ property: 'twitter:title', content: title});
      this.metaService.updateTag({ property: 'twitter:description', content: description});
      this.metaService.updateTag({ property: 'twitter:image', content: image});
      this.metaService.updateTag({ property: 'twitter:image:alt', content: title});
      this.metaService.updateTag({ property: 'twitter:card', content: 'summary_large_image'});
      this.seo.createCanonicalURL();
  }

  getSinglePost(): void {
    this.blogService.getSinglePost(this.slug).subscribe((data) => {
      this.singlePost = data.data;
      this.setSeoTags(this.singlePost);
      const breadcrumbs  =  [
        {
          label: 'Home',
          url: '/'
        },
        {
          label: 'Blog',
          url: '/blog'
        },
        {
          label: this.singlePost.title,
          url: ''
        }
      ];
      this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
      //// console.log(data);
      // console.log(this.singlePost)
    });
  }
}
