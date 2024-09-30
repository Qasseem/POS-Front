import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventType } from '@azure/msal-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { RegexPatterns } from 'src/app/core/shared/core/patterns/regex-patterns';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';

@Component({
  selector: 'oc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPopup = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private storage: StorageService,
    private router: Router,
    private msalSerivce: MsalService,
    private appTranslateService: AppTranslateService
  ) {
    this.appTranslateService.changeLangage('en');
    this.storage.setItem('lang', 'en');
    msalSerivce.initialize().subscribe((res) => {});
  }
  isLoogedIn() {
    return this.msalSerivce.instance.getActiveAccount() != null;
  }
  killSession() {
    this.msalSerivce.logoutRedirect().subscribe({
      next: (result) => {},
      error: (error) => {},
    });
  }
  logIn() {
    // this.killSession();
    let accounts = this.msalSerivce.instance.getAllAccounts();

    if (accounts.length > 0) {
      this.msalSerivce.instance.setActiveAccount(accounts[0]);
    }

    this.msalSerivce.instance.addEventCallback((event) => {
      // set active account after redirect
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        this.msalSerivce.instance.setActiveAccount(account);
      }
    });
    if (this.showPopup) {
      this.msalSerivce.loginPopup().subscribe((resp: AuthenticationResult) => {
        console.warn(resp, accounts);
        this.storage.setItem('token', resp.accessToken);
        console.warn(this.storage.getToken());
        console.warn(localStorage.getItem('token'));
        this.authService.getMenuItems();
        const url = '/main/dashboard';
        // this.permissions.syncRolesPermissions();
        this.router.navigate([url]);
        this.msalSerivce.instance.setActiveAccount(resp.account);
      });
    } else {
      // this.msalSerivce.loginRedirect().subscribe(() => {});
      // try {
      //   this.msalSerivce
      //     .acquireTokenSilent({
      //       scopes: ['user.read'], // Adjust the scope as needed
      //     })
      //     .subscribe((resp: AuthenticationResult) => {
      //       console.warn(resp, accounts);
      //       this.storage.setItem('token', resp.accessToken);
      //       const url = '/main/dashboard';
      //       // this.permissions.syncRolesPermissions();
      //       this.router.navigate([url]);
      //       this.msalSerivce.instance.setActiveAccount(resp.account);
      //     });
      //   // Get the email
      // } catch (error) {
      //   // Handle token acquisition error
      // }
    }
  }

  logOut() {
    this.msalSerivce.logout();
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(RegexPatterns.password),
        ],
      ],
      keepMe: [null],
    });
  }

  onSubmit() {
    let obj = {
      userName: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(obj).subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this),
      });
    }
  }

  handleUpdateResponse(resp) {
    this.spinner.hide();
    if (resp.success) {
      // this.storage.clearStorage();
      this.authService.items = [];
      this.storage.setLoginData(resp);
      const url = '/main/dashboard';
      // this.permissions.syncRolesPermissions();
      this.router.navigate([url]);
    }
  }
  handleError(err) {
    this.spinner.hide();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  goToForgotPage() {
    this.router.navigate(['/forgot']);
  }
}
