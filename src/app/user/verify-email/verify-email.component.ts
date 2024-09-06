import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.sass']
})
export class VerifyEmailComponent implements OnInit {
  success = null;
  token = null;
  loading = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private arouter: ActivatedRoute
  ) {
    this.token = this.arouter.snapshot.queryParams.token;
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const isAuthenticated = await this.userService.isAuthenticated();
    if (isAuthenticated) {
        this.router.navigate(['/user']);
    }
    const isTokenValidated = await this.userService.validateEmailLink(this.token);
    if (isTokenValidated) {
      this.success = true;
    } else {
      this.success = false;
    }
    this.loading = false;
  }

}
