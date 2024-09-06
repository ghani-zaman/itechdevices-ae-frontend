import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.css']
})
export class BlogSectionComponent implements OnInit {
  blogPosts: any = null;
  imageurl = environment.imagesPath + 'Images/Blogs/';
  @Input() postCount = 5;
  cpage = 1;
  total = -1;
  constructor(private blogService: BlogService, @Inject(PLATFORM_ID) private platform ) { }

  ngOnInit(){
    this.getPosts(this.postCount);
  }
  changePage(page: number){
    this.scrollToTop();
    this.cpage = page;
    this.getPosts(this.postCount, this.cpage)
  }
  async getPosts(postCount, page = 1){
    this. blogPosts = await this.blogService.getPosts(postCount, page);
    this.total =  this.blogPosts.total;
    // console.log(this.blogPosts);
  }

  scrollToTop() {
    if(isPlatformBrowser(this.platform)){
      if(this.postCount > 5){
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
}

  trackByMethod(index: number, el: any): string {
    return el.id;
  }

}
