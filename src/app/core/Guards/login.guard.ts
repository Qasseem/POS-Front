import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main/home']);
      return false;
    } else {
      console.log('here');
      return true;
    }
  }
}
