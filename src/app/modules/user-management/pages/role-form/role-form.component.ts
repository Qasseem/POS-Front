import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { RoleService } from '../../services/role.service';
interface Permission {
  id: number;
  nameAr: string;
  nameEn: string;
  accessTypeDtos: AccessType[];
}

interface AccessType {
  id: number;
  nameAr: string;
  nameEn: string;
  serviceId: number;
  isSelected: boolean;
}
@Component({
  selector: 'oc-role-form',
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
})
export class RoleFormComponent implements OnInit, OnDestroy {
  permissions: Permission[] = [];
  alive: boolean = true;
  form: FormGroup;
  categories = [];
  id;
  details: any;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
    const englishLetterPattern = new RegExp(/^[a-zA-Z0-9\s!@#$%^&*()]+$/);

    this.form = this.fb.group({
      roleNameEn: [
        '',
        [Validators.required, Validators.pattern(englishLetterPattern)],
      ],
      servicesAccessIds: [[], Validators.required],
    });
    // this.form.valueChanges.subscribe((response) => {
    //   console.log(response);
    // })

    this.getRolesServiceByRoleId();
  }

  toggleSelectAll(group: any, isChecked: boolean) {
    let selectedPermissions = this.form.get('servicesAccessIds')
      .value as number[];

    group.accessTypeDtos.forEach((item) => {
      this.form.get(String(item.id)).setValue(isChecked);

      if (isChecked && !selectedPermissions.includes(item.id)) {
        selectedPermissions.push(item.id);
      } else if (!isChecked) {
        selectedPermissions = selectedPermissions.filter(
          (id) => id !== item.id
        );
      }
    });

    this.form.get('servicesAccessIds').setValue(selectedPermissions);
  }

  isSelected(permissionId: number): boolean {
    const control = this.form.get('servicesAccessIds') as FormControl;
    return control.value.includes(permissionId);
  }

  getRolesServiceByRoleId() {
    this.roleService
      .getServicesByRoleId(0)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.permissions = resp.data;
          }
        },
      });
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }

    this.getAllMerchantCategories();
    // this.GetMerchantDropdownValues();
  }
  getItemDetails() {
    // this.roleService
    //   .GetDetails(this.id)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe({
    //     next: (resp) => {
    //       if (resp.success) {
    //         this.details = resp.data;
    //         if (this.details) {
    //           this.form.patchValue(this.details);
    //           this.form.updateValueAndValidity();
    //         }
    //       }
    //     },
    //   });
  }

  getAllMerchantCategories() {
    // this.merchantService
    //   .GetAllMerchantCategories()
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe({
    //     next: (resp) => {
    //       if (resp.success) {
    //         this.categories = resp.data;
    //       }
    //     },
    //   });
  }
  onSubmit() {}
  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    if (!this.id) {
      delete obj.id;
    }
    this.roleService
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
  backToList() {
    this.router.navigate(['main/user-management/role/list']);
  }

  // GetMerchantDropdownValues() {
  //   const regionControl = this.form.get('regionId');

  //   this.terminalService
  //     .GetAllRegions()
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe({
  //       next: (resp) => {
  //         if (resp.success) {
  //           this.regionsList = resp.data;
  //           regionControl.setValue(resp.data[0].id);
  //         }
  //       },
  //     });
  //   const cityControl = this.form.get('cityId');
  //   regionControl.valueChanges.subscribe({
  //     next: (regionId) => {
  //       if (regionId) {
  //         this.terminalService
  //           .GetAllCities(regionId)
  //           .pipe(takeWhile(() => this.alive))
  //           .subscribe({
  //             next: (resp) => {
  //               if (resp.success) {
  //                 this.citiesList = resp.data;
  //                 this.orignalCities = resp.data;
  //                 cityControl.setValue(resp.data[0].id);
  //               }
  //             },
  //           });
  //       }
  //     },
  //   });
  //   cityControl.valueChanges.subscribe({
  //     next: (cityId) => {
  //       if (cityId) {
  //         this.terminalService
  //           .GetAllZones(cityId)
  //           .pipe(takeWhile(() => this.alive))
  //           .subscribe((resp) => {
  //             if (resp.success) {
  //               this.zonesList = resp.data;
  //               this.orignalZones = resp.data;
  //               this.form.get('zoneId').setValue(resp.data[0].id);
  //             }
  //           });
  //       }
  //     },
  //   });
  // }

  ngOnDestroy() {
    this.alive = false;
  }
}
