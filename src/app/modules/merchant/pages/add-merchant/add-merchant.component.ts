import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss'],
})
export class AddMerchantComponent implements OnInit {
  form: FormGroup;
  categories = [];
  citiesList = [];
  regionsList = [];
  zonesList = [];
  id;
  details: any;
  orignalZones = [];
  orignalCities = [];
  options: google.maps.MapOptions = {
    center: { lat: 30.06648609010278, lng: 31.242701933248 },
    zoom: 6,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  display: google.maps.LatLngLiteral;
  markerPositions: google.maps.LatLngLiteral[] = [];
  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
    this.form = this.fb.group({
      merchantNameEN: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\s]*$')
      ]],
      merchantNameAR: ['', [
        Validators.required, Validators.pattern('/^[\u0600-\u06FF\s]*$/')]],
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

    this.GetAllMerchantCategories();
  }
  getItemDetails() {
    this.merchantService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        if (this.details) {
          this.form.patchValue(this.details);
          this.form.updateValueAndValidity();
        }
      }
    });
  }

  GetAllMerchantCategories() {
    this.merchantService.GetAllMerchantCategories().subscribe((resp) => {
      if (resp.success) {
        this.categories = resp.data;
      }
    });
  }
  onSubmit() { }
  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    if (!this.id) {
      delete obj.id;
    }
    this.merchantService.Add(this.form.value).subscribe((resp) => {
      if (resp.success) {
        this.backToList();
      }
    });
  }
  backToList() {
    this.router.navigate(['main/merchant/all']);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [event.latLng.toJSON()];
    this.form.controls.longitude.setValue(this.markerPositions[0]?.lng);
    this.form.controls.latitude.setValue(this.markerPositions[0]?.lat);
  }
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }
  GetTerminalDropDownsData() {
    this.merchantService.GetAllRegions().subscribe((resp) => {
      if (resp.success) {
        this.regionsList = resp.data;
      }
    });

    this.merchantService.GetAllCities(0).subscribe((resp) => {
      if (resp.success) {
        this.citiesList = resp.data;
        this.orignalCities = resp.data;
      }
    });


    this.merchantService.GetAllZones(0).subscribe((resp) => {
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
}
