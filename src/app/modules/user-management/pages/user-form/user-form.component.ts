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
  regionsIdsLists = [];
  orignalCities = [];
  orignalZones = [];
  citiesLists = [];
  imageFieldName: string;
  zonesLists = [];
  details: any;
  selectedImages: any = {};
  previewImage: string;
  userTypes = [];
  profileImage: string | ArrayBuffer | null = null;
  fileName: string | null = null;

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
        imageBase64String: [null],
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
        nationalIdBase64String: [null],
        userType: [null, Validators.required],
        managerId: [null],
        rolesIds: [[], Validators.required],
        id: [null],
        isManager: [false],
        regionId: [null, Validators.required],
        cityId: [null, Validators.required],
        zoneId: [null, Validators.required],
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
  onFileSelectedNationalId(event: any) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({
          nationalIdBase64String: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        this.profileImage = result;
        this.form.patchValue({ imageBase64String: result });
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
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

    this.userService
      ?.getAllUsersTypeDropDown()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.userTypes = resp.data;
          }
        },
      });
    const regionControl = this.form.get('regionId');
    this.terminalService
      .GetAllRegions()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.regionsIdsLists = resp.data;
            regionControl.setValue(resp.data[0].id);
          }
        },
      });
    const cityControl = this.form.get('cityId');
    regionControl.valueChanges.subscribe({
      next: (regionId) => {
        if (regionId) {
          this.terminalService
            .GetAllCities(regionId)
            .pipe(takeWhile(() => this.alive))
            .subscribe({
              next: (resp) => {
                if (resp.success) {
                  this.citiesLists = resp.data;
                  this.orignalCities = resp.data;
                  // cityControl.setValue(resp.data[0].id);
                }
              },
            });
        }
      },
    });
    cityControl.valueChanges.subscribe({
      next: (cityId) => {
        if (cityId) {
          this.terminalService
            .GetAllZones(cityId)
            .pipe(takeWhile(() => this.alive))
            .subscribe({
              next: (resp) => {
                if (resp.success) {
                  this.zonesLists = resp.data;
                  this.orignalZones = resp.data;
                  // this.form.get('zoneId').setValue(resp.data[0].id);
                }
              },
            });
        }
      },
    });
  }

  regionChanged(event) {
    this.form.controls.cityId.setValue(null);
    this.citiesLists = this.orignalCities;
    if (event) {
      this.citiesLists = this.citiesLists.filter(
        (x) => x.parentId == event.value
      );
    }
  }

  cityChanged(event) {
    this.form.controls.zoneId.setValue(null);
    this.zonesLists = this.orignalZones;
    if (event) {
      this.zonesLists = this.zonesLists.filter(
        (x) => x.parentId == event.value
      );
    }
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
              if (resp.data.rolesIds) {
                this.form.get('rolesIds').setValue(resp.data.rolesIds);
              }
              this.profileImage = resp.data.imageUrl;
              this.fileName = resp.data.nationalIdUrl;
              this.form.get('password').clearValidators();
              this.form.get('password').updateValueAndValidity();
              this.form.get('confirmPassword').clearValidators();
              this.form.get('confirmPassword').updateValueAndValidity();
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

    if (this.formType == 'add') {
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
    } else {
      this.userService
        .UpdateUser(this.form.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    }
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

  ngOnDestroy() {
    this.alive = false;
  }
}
