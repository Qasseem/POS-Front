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
  filteredGroups = [];

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
    const arabicLetterPattern = new RegExp(/^[\u0600-\u06FF0-9\s!@#$%^&*()]+$/);

    this.form = this.fb.group({
      id: [null],
      roleNameEn: [
        '',
        [Validators.required, Validators.pattern(englishLetterPattern)],
      ],
      roleNameAr: [
        '',
        [Validators.required, Validators.pattern(arabicLetterPattern)],
      ],
      servicesAccessIds: this.fb.array([], [Validators.required]),
    });
    if (this.formType == 'add') this.getRolesServiceByRoleId();
  }

  get servicesAccessIds(): FormArray {
    return this.form.get('servicesAccessIds') as FormArray;
  }
  initializeFormArray(permissions): void {
    permissions.forEach((group) => {
      const allChecked = group.accessTypeDtos.every((item) => item.isSelected);
      const groupArray = this.fb.group({
        groupName: group.nameEn,
        items: this.fb.array(
          group.accessTypeDtos.map((item) =>
            this.fb.group({
              id: item.id,
              name: item.nameEn,
              checked: this.formType == 'add' ? false : item.isSelected,
            })
          )
        ),
        isChecked: allChecked, // Initialize isChecked based on allChecked condition
      });
      (this.form.get('servicesAccessIds') as FormArray).push(groupArray);
    });

    // Initially display all groups
    this.filteredGroups = [
      ...(this.form.get('servicesAccessIds') as FormArray).controls,
    ];
  }

  groupSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      // If search term is empty, show all groups
      this.filteredGroups = [
        ...(this.form.get('servicesAccessIds') as FormArray).controls,
      ];
    } else {
      // Filter groups based on GroupName
      this.filteredGroups = (
        this.form.get('servicesAccessIds') as FormArray
      ).controls.filter((group) =>
        group
          .get('groupName')
          .value.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
  }

  toggleAllCheckboxes(groupIndex: number, isChecked: boolean): void {
    const groupArray = (this.form.get('servicesAccessIds') as FormArray)
      .at(groupIndex)
      .get('items') as FormArray;
    if (groupArray) {
      groupArray.controls.forEach((control) => {
        control.get('checked').setValue(isChecked);
      });
    }

    // Update isChecked state for the current group
    const allChecked = groupArray.controls.every(
      (control) => control.get('checked').value
    );
    (this.form.get('servicesAccessIds') as FormArray)
      .at(groupIndex)
      .get('isChecked')
      .setValue(allChecked);
  }

  isChecked(groupIndex: number): boolean {
    const groupArray = (this.form.get('servicesAccessIds') as FormArray)
      .at(groupIndex)
      .get('items') as FormArray;
    if (!groupArray) return false;

    // Check if all items in the group are checked
    return groupArray.controls.every((control) => control.get('checked').value);
  }

  getRolesServiceByRoleId(id = 0) {
    this.roleService
      .getServicesByRoleId(this.formType == 'add' ? 0 : id)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.permissions = resp.data;
            this.initializeFormArray(this.permissions);
          }
        },
      });
  }
  getSelectedGroupCount(items) {
    return items.filter((item) => item.checked).length;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
  }
  getItemDetails() {
    this.roleService
      .GetDetails(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.details = resp.data;
            if (this.details) {
              this.form.patchValue(this.details);
              this.form.get('id').patchValue(this.details.roleId);
              this.getRolesServiceByRoleId(this.id);
            }
          }
        },
      });
  }

  getControl(groupIndex, itemIndex) {
    return (this.servicesAccessIds.at(groupIndex) as FormArray)?.controls
      .at(itemIndex)
      ?.get('checked');
  }

  get f() {
    return this.form.controls;
  }

  beforeSubmit(formValue) {
    const accessIds = structuredClone(formValue.servicesAccessIds);
    let ids = [];
    accessIds.forEach((group) => {
      group.items.forEach((item) => {
        if (item.checked) ids.push(item.id);
      });
    });
    formValue.servicesAccessIds = ids;
    return formValue;
  }
  submit() {
    let formValue = structuredClone(this.form.value);
    formValue = this.beforeSubmit(formValue);
    if (!this.id) {
      delete formValue.id;
    }
    if (this.formType == 'add') {
      this.roleService
        .Add(formValue)
        .pipe(takeWhile(() => this.alive))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    } else {
      this.roleService
        .Update(formValue)
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
  backToList() {
    this.router.navigate(['main/user-management/role/list']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
