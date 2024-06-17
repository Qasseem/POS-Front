import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'oc-terminal-form',
  templateUrl: './terminal-form.component.html',
  styleUrls: ['./terminal-form.component.scss'],
})
export class TerminalFormComponent implements OnInit, AfterViewInit, OnDestroy {
  alive = false;
  form: FormGroup;
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
    this.form = this.fb.group({
      merchantId: ['', Validators.required],
      terminalId: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
          Validators.pattern(/^\d{5,30}$/),
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
      address: [null, Validators.required],
      landMark: [null, [Validators.required]],
      id: [null],
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
      .GetAllMechantDropDown()
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            this.allMerchantList = resp.data;
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

              this.form.patchValue(this.details);
              this.form.updateValueAndValidity();
            }
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
    this.service
      .Add(this.form.value)
      .pipe(takeWhile(() => this.alive))
      .subscribe((resp) => {
        if (resp.success) {
          this.backToList();
        }
      });
  }
  backToList() {
    this.router.navigate(['main/terminal/all']);
  }

  print() {}

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
  cityChanged(event) {
    this.form.controls.zoneId.setValue(null);
    this.zonesList = this.orignalZones;
    if (event) {
      this.zonesList = this.zonesList.filter((x) => x.parentId == event.value);
    }
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
