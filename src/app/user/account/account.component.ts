import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  tab =  null;
  id = null;
  loading = false;
  user = null;
  constructor(
    private arouter: ActivatedRoute,
    private userService: UserService
  ) {
    if (this.arouter.snapshot.params.tab) {
      this.tab = this.arouter.snapshot.params.tab;
    }
    if (this.arouter.snapshot.params.id) {
      this.id  = this.arouter.snapshot.params.id;
    }
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser();
    this.userService.updateFlag$.subscribe(async (res: any) => {
      this.user = await this.userService.getUser();
    });
    this.arouter.params.subscribe((res) => {
      if (res.tab) {
        this.tab = res.tab;
      }
      if (res.id) {
        this.id = res.id;
      }
      /*this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 100);*/
    });
  }

}
