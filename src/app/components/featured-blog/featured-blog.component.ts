import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-featured-blog',
  templateUrl: './featured-blog.component.html',
  styleUrls: ['./featured-blog.component.css']
})
export class FeaturedBlogComponent implements OnInit {
  featuredPost: any;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getFeaturedBlog();
  }

  getFeaturedBlog(){
    /*this.blogService.getPosts(1).subscribe(
      data => {
        this.featuredPost = data[0];
        //// console.log(data);
        // console.log(this.featuredPost)
      }
    )*/

  }

}
