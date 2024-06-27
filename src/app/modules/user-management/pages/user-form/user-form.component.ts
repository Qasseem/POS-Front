import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { PasswordMatchValidator } from 'src/app/core/validators/password-strength.validator';

@Component({
  selector: 'oc-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  alive: boolean = true;
  form: FormGroup;
  formType = 'add';
  id;
  rolesIdsLists = [];
  managerIdsLists = [];
  citiesLists = [];
  imageFieldName: string;
  zonesLists = [];
  details: any;
  selectedImages: any = {};
  previewImage: string;
  userTypes = [
    { label: 'System User', value: 0 },
    { label: 'Service Agent', value: 1 },
    { label: 'Sales Agent', value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private terminalService: TerminalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/i;
    const phoneNumberValidation = /^01\d{9}$/;
    const namePattern =
      /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]*[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    const passwordPattern = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+$/;

    this.form = this.fb.group(
      {
        imageBase64String: [''],
        firstName: ['', [Validators.required, Validators.pattern(namePattern)]],
        lastName: ['', [Validators.required, Validators.pattern(namePattern)]],
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern(emailPattern),
            Validators.maxLength(50),
          ],
        ],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(phoneNumberValidation)],
        ],
        nationalId: [''],
        nationalIdBase64String: [''],
        userType: [null, Validators.required],
        managerId: [null],
        rolesIds: [null, Validators.required],
        isManager: [false],
        zoneId: [null, Validators.required],
        regionId: [null, Validators.required],
        cityId: [null, Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(passwordPattern),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: PasswordMatchValidator('password', 'confirmPassword') }
    );
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    // this.getAllMerchantCategories();
    this.GetUsersDropdownValues();
  }
  GetUsersDropdownValues() {
    this.userService
      ?.getAllRolesDropdown()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.rolesIdsLists = resp.data;
          }
        },
      });

    this.userService
      ?.getAllManagersDropdown()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.managerIdsLists = resp.data;
          }
        },
      });
  }

  getItemDetails() {
    this.userService
      .GetDetails(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.details = resp.data;
            if (this.details) {
              this.form.patchValue(this.details);
              this.form.updateValueAndValidity();
            }
          }
        },
      });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    if (!this.id) {
      delete obj.id;
    }
    obj = this.refactorObjectBeforeSubmit(obj);
    this.userService
      .Save(this.form.value)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.backToList();
          }
        },
      });
  }

  refactorObjectBeforeSubmit(object) {
    if (object) {
      if (object.regionId) {
        delete object.regionId;
      }
      if (object.cityId) {
        delete object.cityId;
      }
    }
    return object;
  }

  backToList() {
    this.router.navigate(['main/user-management/user/list']);
  }
}
