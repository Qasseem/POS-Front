import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
@Component({
  selector: 'oc-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.scss'],
})
export class MerchantFormComponent implements OnInit, OnDestroy {
  alive: boolean = true;
  form: FormGroup;
  categories = [];
  citiesList = [];
  regionsList = [];
  zonesList = [];
  id;
  details: any;
  orignalZones = [];
  orignalCities = [];
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    this.form = this.fb.group({
      merchantNameEN: ['', [Validators.required]],
      merchantNameAR: [
        '',
        [Validators.required, Validators.pattern('/^[\u0600-\u06FFs]*$/')],
      ],
      userName: ['', Validators.required],
      categoryId: [null, Validators.required],
      id: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      regionId: [null, Validators.required],
      cityId: [null, Validators.required],
      zoneId: [null, Validators.required],
      address: [null, Validators.required],
      landMark: [null, [Validators.required]],
    });
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }

    this.getAllMerchantCategories();
    this.GetMerchantDropdownValues();
  }
  getItemDetails() {
    this.merchantService
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

  getAllMerchantCategories() {
    this.merchantService
      .GetAllMerchantCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.categories = resp.data;
          }
        },
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
    this.merchantService
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
    this.router.navigate(['main/merchant/all']);
  }

  GetMerchantDropdownValues() {
    this.merchantService
      .GetAllRegions()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.regionsList = resp.data;
          }
        },
      });

    this.merchantService
      .GetAllCities(0)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.citiesList = resp.data;
            this.orignalCities = resp.data;
          }
        },
      });

    this.merchantService
      .GetAllZones(0)
      .pipe(takeWhile(() => this.alive))
      .subscribe((resp) => {
        if (resp.success) {
          this.zonesList = resp.data;
          this.orignalZones = resp.data;
        }
      });
  }

  cityChanged(event) {
    this.form.controls.zoneId.setValue(null);
    this.zonesList = this.orignalZones;
    if (event) {
      this.zonesList = this.zonesList.filter((x) => x.parentId == event.value);
    }
  }

  regionChanged(event) {
    this.form.controls.cityId.setValue(null);
    this.form.controls.zoneId.setValue(null);
    this.citiesList = this.orignalCities;
    if (event) {
      this.citiesList = this.citiesList.filter(
        (x) => x.parentId == event.value
      );
    }
  }
  ngOnDestroy() {
    this.alive = false;
  }
}
