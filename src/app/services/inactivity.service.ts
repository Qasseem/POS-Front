// inactivity.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { MsalService } from '@azure/msal-angular';
import { StorageService } from '../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timer: any;
  private inactivityDuration = 15 * 60 * 1000; // Set to 15 minutes
  private userInactive: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private _authService: AuthService,
    private msalSerivce: MsalService,
    public storage: StorageService
  ) {
    this.initialize();
  }

  // Initialize event listeners for user interactions
  initialize() {
    this.resetTimer();
    // window.addEventListener('mousemove', () => this.resetTimer());
    window.addEventListener('click', () => this.resetTimer());
    window.addEventListener('keydown', () => this.resetTimer());
    window.addEventListener('scroll', () => this.resetTimer());
    window.addEventListener('touchstart', () => this.resetTimer());
  }

  // Reset the inactivity timer
  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(
      () => this.handleInactivity(),
      this.inactivityDuration
    );
  }

  // Handle user inactivity
  handleInactivity() {
    this.userInactive.next(true);
    this.logoutUser();
  }

  // Expose user inactivity as an observable
  onUserInactive(): Observable<any> {
    return this.userInactive.asObservable();
  }

  // Log the user out and redirect to login page
  logoutUser() {
    this._authService.logOut();
  }
}
