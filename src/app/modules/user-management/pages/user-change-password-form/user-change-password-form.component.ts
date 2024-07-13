import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { PasswordMatchValidator } from 'src/app/core/validators/password-strength.validator';

@Component({
  selector: 'oc-user-change-password-form',
  templateUrl: './user-change-password-form.component.html',
  styleUrl: './user-change-password-form.component.scss',
})
export class UserChangePasswordFormComponent {
  alive: boolean = true;
  form: FormGroup;
  formType = 'add';
  userId;
  details: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
    const passwordPattern = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    this.form = this.fb.group(
      {
        userId: [''],
        NewPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(passwordPattern),
          ],
        ],
        ConfirmNewPassword: ['', Validators.required],
      },
      { validators: PasswordMatchValidator('password', 'ConfirmNewPassword') }
    );
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.userId = this.route.snapshot.params.id || null;
    }
  }

  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    if (!this.userId) {
      delete obj.userId;
    }
    this.form.get('userId').setValue(this.userId);
    this.userService
      .UserChangePassword(this.form.value)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.backToList();
          }
        },
      });
  }

  backToList() {
    this.router.navigate(['main/user-management/user/list']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
