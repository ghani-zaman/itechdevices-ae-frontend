import { ActivatedRoute, Router } from '@angular/router';
import { RESPONSE } from '../../../express.tokens'
import { Component, OnInit, Inject, Optional } from '@angular/core'
import { Response } from 'express'
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-redirect-permanent',
  templateUrl: './redirect-permanent.component.html',
  styleUrls: ['./redirect-permanent.component.css']
})
export class RedirectPermanentComponent {
  private response: Response;
  loading =  false;
  location = '';
  constructor(@Optional() @Inject(RESPONSE) response: any, private ac: ActivatedRoute, private router: Router) {
    this.response = response;
  }

  ngOnInit() {
    this.location = (this.ac.snapshot.queryParams['redirected']) ? this.ac.snapshot.queryParams['redirected'] : '';
    // console.log(this.location);
    if (this.response) {
      this.response.setHeader('Location' , '/' + this.location);
      this.response.status(301);
    }
    if(this.location.includes('categories')){
      const loc = this.location.split('/');
      this.router.navigate(loc);
    }else{
      this.router.navigate(['/', this.location]);
    }
  }
}
