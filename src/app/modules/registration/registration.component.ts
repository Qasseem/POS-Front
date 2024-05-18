import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RegexPatterns } from 'src/app/core/shared/core/patterns/regex-patterns';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';
import { StorageService } from 'src/app/core/storage/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  token: any;
  registerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private storage: StorageService,
    private appTranslateService: AppTranslateService
  ) {
    this.token = this.route.snapshot.params['token'] || null;
    this.appTranslateService.changeLangage('en');
    this.storage.setItem('lang', 'en');
  }

  ngOnInit(): void {
    this.storage.clearStorageWithoutReload();
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.Email)],
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm_password: [
            '',
            [Validators.required, Validators.minLength(6)],
          ],
        },
        { validator: this.passwordConfirming }
      ),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.spinner.show();
      let formData = {
        email: this.email.value,
        UserName: this.email.value,
        firstNameAr: this.firstName.value,
        firstNameEn: this.firstName.value,
        lastNameAr: this.lastName.value,
        lastNameEn: this.lastName.value,
        customerCode: this.token,
        password: this.password.value,
        confirmPasssword: this.confirmPassword.value,
      };

      this.authService.register(formData).subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this),
      });
    }
  }

  handleUpdateResponse(resp) {
    this.spinner.hide();
    if (resp.success) {
      this.storage.setLoginData(resp);
      // this.permissions.syncRolesPermissions();
      this.router.navigate(['/main']);
    }
  }
  handleError(err) {
    this.spinner.hide();
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get(['passwords', 'password']);
  }
  get confirmPassword() {
    return this.registerForm.get(['passwords', 'confirm_password']);
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
    return null;
  }
}
