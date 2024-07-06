import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  backToHome() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main/merchant/list']).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/auth/login']).then(() => {});
    }
  }
}
