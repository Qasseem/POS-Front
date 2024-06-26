import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';

@Component({
  selector: 'oc-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrl: './zone-form.component.scss',
})
export class ZoneFormComponent {
  alive: boolean = true;
  form: FormGroup;
  categories = [];
  citiesList = [];
  orignalCities = [];

  regionsList = [];
  details: any;
  id;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private router: Router,
    private route: ActivatedRoute,
    private terminalService: TerminalService
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
      nameEn: [
        '',
        [Validators.required, Validators.pattern(englishLetterPattern)],
      ],
      nameAr: [
        '',
        [Validators.required, Validators.pattern(arabicLetterPattern)],
      ],
      regionId: [null, Validators.required],
      cityId: [null, Validators.required],
      // isActive: [false],
      id: [null],
    });
    this.getRegionCityLists();
  }
  getRegionCityLists() {
    const regionControl = this.form.get('regionId');
    this.terminalService
      .GetAllRegions()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.regionsList = resp.data;
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
                  this.citiesList = resp.data;
                  this.orignalCities = resp.data;
                  // cityControl.setValue(resp.data[0].id);
                }
              },
            });
        }
      },
    });
  }

  regionChanged(event) {
    this.form.controls.cityId.setValue(null);
    this.citiesList = this.orignalCities;
    if (event) {
      this.citiesList = this.citiesList.filter(
        (x) => x.parentId == event.value
      );
    }
  }

  getItemDetails() {
    this.zoneService
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
      this.zoneService
        .addZone(this.form.value)
        .pipe(takeWhile(() => this.alive))
        .subscribe({
          next: (resp) => {
            if (resp.success) {
              this.backToList();
            }
          },
        });
    } else {
      this.zoneService
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
    this.router.navigate(['main/locations/zone/list']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
