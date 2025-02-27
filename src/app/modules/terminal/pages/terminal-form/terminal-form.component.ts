import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, takeWhile } from 'rxjs';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'oc-terminal-form',
  templateUrl: './terminal-form.component.html',
  styleUrls: ['./terminal-form.component.scss'],
})
export class TerminalFormComponent implements OnInit, AfterViewInit, OnDestroy {
  alive = true;
  terminalForm: FormGroup;
  id;
  details: any;

  citiesList = [];
  regionsList = [];
  zonesList = [];
  errandChannelsList = [];
  posList = [];

  allMerchantList = [];
  orignalZones = [];
  orignalCities = [];
  formType = 'add';
  coordinates = { lng: null, lat: null };

  constructor(
    private fb: FormBuilder,
    private service: TerminalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    this.getTerminalDropDownsData();
    this.terminalForm = this.fb.group({
      merchantId: [null, Validators.required],
      terminalId: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern(/^\d{1,30}$/),
        ],
      ],
      phoneNumber: [
        null,
        [
          Validators.minLength(10),
          Validators.maxLength(14),
          Validators.pattern(/^\d{10,14}$/),
        ],
      ],
      errandChannelId: [null, Validators.required],
      posTypeId: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      regionId: [null, Validators.required],
      cityId: [null, Validators.required],
      zoneId: [null, Validators.required],
      address: [null],
      landMark: [null],
      id: [null],
    });
    combineLatest([
      this.terminalForm.get('latitude').valueChanges,
      this.terminalForm.get('longitude').valueChanges,
    ]).subscribe({
      next: ([lat, lng]) => {
        if (lat && lng) {
          this.service.GetAddressFromLatLng(lat, lng).subscribe({
            next: (res: any) => {
              if (this.formType == 'add')
                this.terminalForm
                  .get('address')
                  .patchValue(res.address.LongLabel);
            },
          });
        }
      },
    });
  }

  ngAfterViewInit(): void {
    // this.showMap = true;
  }

  getTerminalDropDownsData() {
    this.service
      .GetAllRegions()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.regionsList = resp.data;
          }
        },
      });

    this.service
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

    this.service
      .GetAllMerchantDropDown()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            resp.data.forEach((item) => {
              item.searchKey =
                (item?.id ?? '') +
                (item.nameEn ?? '') +
                (item?.nameAr ?? '') +
                (item?.merchantId ?? '');
            });

            this.allMerchantList = resp.data;
            this.route.queryParams.subscribe((params) => {
              if (params.hasOwnProperty('merchantId')) {
                const merchantId = params['merchantId'];
                if (merchantId) {
                  const selectedMerchant = this.allMerchantList.find(
                    (merchant) => merchant.id == merchantId // Use == for loose comparison to handle different types
                  );
                  if (selectedMerchant) {
                    this.terminalForm
                      .get('merchantId')
                      .setValue(selectedMerchant.id);
                  }
                }
              }
            });
          }
        },
      });

    this.service
      .GetAllErrandChannels()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.errandChannelsList = resp.data;
          }
        },
      });

    this.service
      .GetAllPOSTypes()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.posList = resp.data;
          }
        },
      });

    this.service
      .GetAllZones(0)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.zonesList = resp.data;
            this.orignalZones = resp.data;
          }
        },
      });
  }

  getItemDetails() {
    this.service
      .GetDetails(this.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.details = resp.data;
            if (this.details) {
              // setTimeout(() => {
              //   this.regionChanged(resp.data?.regionId);
              //   this.cityChanged(resp.data?.cityId);
              // }, 1000);

              this.terminalForm.patchValue(this.details);
              this.coordinates.lng = parseFloat(this.details.longitude);
              this.coordinates.lat = parseFloat(this.details.latitude);
              this.coordinates = { ...this.coordinates };
              this.terminalForm.updateValueAndValidity();
            }
          }
        },
      });
  }

  onSubmit() {}
  get f() {
    return this.terminalForm.controls;
  }
  submit() {
    let obj = this.terminalForm.value;
    if (!this.id) {
      delete obj.id;
    }
    this.service
      .Add(this.terminalForm.value)
      .pipe(takeWhile(() => this.alive))
      .subscribe((resp) => {
        if (resp.success) {
          this.backToList();
        }
      });
  }
  backToList() {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('merchantId')) {
        const merchantId = params['merchantId'];
        this.router.navigate([`main/merchant/details/${merchantId}`]);
      } else {
        this.router.navigate(['main/terminal/list']);
      }
    });
  }

  print() {}

  regionChanged(event) {
    this.terminalForm.controls.cityId.setValue(null);
    this.terminalForm.controls.zoneId.setValue(null);
    this.citiesList = this.orignalCities;
    if (event) {
      this.citiesList = this.citiesList.filter(
        (x) => x.parentId == event.value
      );
    }
  }
  formatLngLat(string) {
    return string !== null ? parseFloat(string).toFixed(6).toString() : '-';
  }
  cityChanged(event) {
    this.terminalForm.controls.zoneId.setValue(null);
    this.zonesList = this.orignalZones;
    if (event) {
      this.zonesList = this.zonesList.filter((x) => x.parentId == event.value);
    }
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
