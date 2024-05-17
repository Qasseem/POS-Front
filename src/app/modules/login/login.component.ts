import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';
import { StorageService } from 'src/app/core/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private storage: StorageService,
    private router: Router,
    private appTranslateService: AppTranslateService
  ) {
    this.appTranslateService.changeLangage('en');
    this.storage.setItem('lang', 'en');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Hi', this.loginForm);
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
      console.log('success');
      this.storage.setLoginData(resp);
      const url = '/home/dashboard';
      // this.permissions.syncRolesPermissions();
      this.router.navigate(['/main']);
    }
  }
  handleError(err) {
    this.spinner.hide();
    console.log(err);
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
