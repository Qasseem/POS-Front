import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AdminActivitiesService } from '../../services/admin-activities.service';
@Component({
  selector: 'oc-categories-errands-types-form',
  templateUrl: './categories-errands-types-form.component.html',
  styleUrls: ['./categories-errands-types-form.component.scss'],
})
export class CategoriesErrandTypesFormComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  form: FormGroup;
  id;
  details: any;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private adminActivitiesServices: AdminActivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    const arabicLetterPattern = new RegExp(/[\u0600-\u06FF\s]/u);
    const englishLetterPattern = new RegExp(/^[a-zA-Z]+$/);
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      nameEn: [
        '',
        [Validators.required, Validators.pattern(englishLetterPattern)],
      ],
      nameAr: ['', [Validators.pattern(arabicLetterPattern)]],
      serviceLevel: ['', Validators.required],
      isActive: [false],
      // isDeleted: [false],
      id: [null],
    });
  }
  getItemDetails() {
    this.adminActivitiesServices
      .GetCategoriesErrandsTypesDetails(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe((resp) => {
        if (resp.success) {
          this.details = resp.data;
          if (this.details) {
            this.form.patchValue(this.details);
            this.form.updateValueAndValidity();
          }
        }
      });
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
    this.adminActivitiesServices
      .AddErrandsType(this.form.value)
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
    this.router.navigate(['main/admin-activities/categories-errands-types']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
