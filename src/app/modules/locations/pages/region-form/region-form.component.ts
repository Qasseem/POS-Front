import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../../services/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'oc-region-form',
  templateUrl: './region-form.component.html',
  styleUrl: './region-form.component.scss',
})
export class RegionFormComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  form: FormGroup;
  categories = [];
  details: any;
  id;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }
  ngOnInit() {
    const arabicLetterPattern = new RegExp(/^[\u0600-\u06FF0-9\s!@#$%^&*()]+$/);
    const englishLetterPattern = new RegExp(/^[a-zA-Z0-9\s!@#$%^&*()]+$/);
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    this.form = this.fb.group({
      nameEn: [
        '',
        [Validators.required, Validators.pattern(englishLetterPattern)],
      ],
      nameAr: [
        '',
        [Validators.required, Validators.pattern(arabicLetterPattern)],
      ],
      // isActive: [false],
      id: [null],
    });
  }

  getItemDetails() {
    this.regionService
      .getDetailsById(this.id)
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
  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    if (!this.id) {
      delete obj.id;
    }
    if (this.formType == 'add') {
      this.regionService
        .addRegion(this.form.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    } else {
      this.regionService
        .update(this.form.value)
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
    this.router.navigate(['main/locations/region/list']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
