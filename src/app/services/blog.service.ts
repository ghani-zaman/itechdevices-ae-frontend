import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  /*private blogUrl = 'https://mc.softception.digital';
  httpOptions = {
    headers: new HttpHeaders ({
      'Access-Control-Allow-Origin': '**'
    })
  }*/
  private blogUrl = environment.apiUrl + environment.webId + '/blog'

  constructor(private http: HttpClient) { }

  async getPosts(limit: any, $page = 1): Promise<any> {
    // const url = `${this.blogUrl}/wp-json/wp/v2/posts?_embed&per_page=${limit}`;
    const url = this.blogUrl + '?limit=' + limit + '&page=' + $page;
    const resp$ = this.http.get(url);
    const resp: any = await lastValueFrom(resp$);
    return resp.data;
  }

  getSinglePost(slug: any): Observable<any> {
    // const url = `${this.blogUrl}/wp-json/wp/v2/posts?slug=${slug}`;
    const url = this.blogUrl + '/' + slug;
    return this.http.get(url);
  }

  getFeaturedImage(id: any): void{

  }
}
