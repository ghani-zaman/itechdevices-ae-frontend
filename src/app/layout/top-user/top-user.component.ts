import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.sass']
})
export class TopUserComponent implements OnInit {

  user: any;
  isLoggedIn = false;
  loggingOut = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.userService.loginFlag$.subscribe((data: any) => {
      this.isLoggedIn = data;
    });
  }

  async isAuthenticated(): Promise<void> {
    try {
      if (await this.userService.isAuthenticated()) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } catch (err) {
      this.isLoggedIn = false;
    }
  }

  async logout(): Promise<void> {
    try {
      this.loggingOut = true;
      const data = await this.userService.logout();
      this.loggingOut = false;
    } catch (err) {
      this.loggingOut = false;
    }
  }

}
