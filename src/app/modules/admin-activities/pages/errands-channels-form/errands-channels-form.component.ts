import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { ErrandChannelService } from '../../services/errand-channel.service';
@Component({
  selector: 'oc-errands-channels-form',
  templateUrl: './errands-channels-form.component.html',
  styleUrls: ['./errands-channels-form.component.scss'],
})
export class ErrandsChannelsFormComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  form: FormGroup;
  details: any;
  categories = [];
  id;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: ErrandChannelService
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
      nameAr: ['', [Validators.pattern(arabicLetterPattern)]],
      // isDeleted: [false],
      id: [null],
    });
  }
  getItemDetails() {
    this.service
      .GetErrandsChannelDetails(this.id)
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
    this.service
      .AddErrandsChannel(this.form.value)
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
    this.router.navigate(['main/admin-activities/list/errands-channels']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
