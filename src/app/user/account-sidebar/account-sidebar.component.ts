import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.sass']
})
export class AccountSidebarComponent implements OnInit {
  @Input() tab: any = null;
  user = null;
  userloading = false;
  loggingOut = false;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  async logout(): Promise<void> {
    try {
      this.loggingOut = true;
      const data = await this.userService.logout();
      this.router.navigate(['/user/login']);
      this.loggingOut = false;
    } catch (err) {
      this.loggingOut = false;
    }
  }

  async getUser(): Promise<void> {
    try {
      this.userloading = true;
      const userData = await this.userService.getUser();
      this.user = userData;
      // // console.log(userData);
      this.userloading = false;
    } catch (err) {
      this.userloading = false;
    }
  }

}
