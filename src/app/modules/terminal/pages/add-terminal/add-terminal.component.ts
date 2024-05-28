import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/modules/merchant/services/merchant.service';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-add-terminal',
  templateUrl: './add-terminal.component.html',
  styleUrls: ['./add-terminal.component.css'],
})
export class AddTerminalComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  categories = [];
  id;
  details: any;

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
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng.toJSON();
    console.log(this.center);
  }
  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions = [event.latLng.toJSON()];
    console.log(this.markerPositions);
  }
  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    // this.showMap = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
    this.form = this.fb.group({
      merchantId: ['', Validators.required],
      terminalId: ['', Validators.required],
      phone: [''],
      errandChannelId: [null, Validators.required],
      posTypeId: [null, Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      regionId: [null, Validators.required],
      cityId: [null, Validators.required],
      zoneId: [null, Validators.required],
      address: [null, Validators.required],
      landMark: [null],
      id: [null],
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
        console.log(this.details);
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
  onSubmit() {}
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
}
