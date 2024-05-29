import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'app-add-terminal',
  templateUrl: './add-terminal.component.html',
  styleUrls: ['./add-terminal.component.css'],
})
export class AddTerminalComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  id;
  details: any;

  citiesList = [];
  regionsList = [];
  zonesList = [];
  errandChannelsList = [];
  posList = [];

  options: google.maps.MapOptions = {
    center: { lat: 30.06648609010278, lng: 31.242701933248 },
    zoom: 6,
  };
  center: google.maps.LatLngLiteral = {
    lat: 30.06648609010278,
    lng: 31.242701933248,
  };

  zoom = 5;
  display: google.maps.LatLngLiteral;
  showMap: boolean;
  markerPositions: google.maps.LatLngLiteral[] = [];
  allMerchantList = [];
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng.toJSON();
    console.log(this.center);
  }
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [event.latLng.toJSON()];
    this.form.controls.longitude.setValue(this.markerPositions[0]?.lng);
    this.form.controls.latitude.setValue(this.markerPositions[0]?.lat);
    console.log(this.markerPositions);
  }
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

  constructor(
    private fb: FormBuilder,
    private service: TerminalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.GetTerminalDropDownsData();
  }
  ngAfterViewInit(): void {
    // this.showMap = true;
  }
  GetTerminalDropDownsData() {
    this.service.GetAllRegions().subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.regionsList = resp.data;
      }
    });

    this.service.GetAllCities(0).subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.citiesList = resp.data;
      }
    });

    this.service.GetAllMechantDropDown().subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.allMerchantList = resp.data;
      }
    });

    this.service.GetAllErrandChannels().subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.errandChannelsList = resp.data;
      }
    });

    this.service.GetAllPOSTypes().subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.posList = resp.data;
      }
    });

    this.service.GetAllZones(0).subscribe((resp) => {
      if (resp.success) {
        console.log(resp);
        this.zonesList = resp.data;
      }
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
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
  getItemDetails() {
    this.service.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        if (this.details) {
          this.regionChanged(resp.data?.regionId);
          this.cityChanged(resp.data?.cityId);
          this.markerPositions.push({
            lat: resp.data.latitude,
            lng: resp.data?.longitude,
          });
          this.form.patchValue(this.details);
          this.form.updateValueAndValidity();
        }
        console.log(this.details);
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
    this.service.Add(this.form.value).subscribe((resp) => {
      if (resp.success) {
        this.backToList();
      }
    });
  }
  backToList() {
    this.router.navigate(['main/terminal/all']);
  }

  print() {
    console.log(this.form);
  }

  regionChanged(event) {
    this.form.controls.cityId.setValue(null);
    this.form.controls.zoneId.setValue(null);
    if (event) {
      this.citiesList = this.citiesList.filter(
        (x) => x.parentId == event.value
      );
    }
  }
  cityChanged(event) {
    this.form.controls.zoneId.setValue(null);
    if (event) {
      this.zonesList = this.zonesList.filter((x) => x.parentId == event.value);
    }
  }
}
