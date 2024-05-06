import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.css'],
})
export class NotAuthComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  backToHome() {
    this.router.navigate(['/home/main']).then(() => {
      window.location.reload();
    });
  }
}
