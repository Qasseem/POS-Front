import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.scss'],
})
export class NotAuthComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  backToHome() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main/home']).then(() => {
        window.location.reload();
      });
    }else {
      this.router.navigate(['/auth/login']).then(() => {
        window.location.reload();
      });
    }
  }
}
