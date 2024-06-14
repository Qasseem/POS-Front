import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from 'src/app/modules/merchant/services/merchant.service';
import { APIURL } from 'src/app/services/api';
import { TerminalService } from '../../services/terminal.service';

@Component({
  selector: 'oc-view-terminal',
  templateUrl: './view-terminal.component.html',
  styleUrls: ['./view-terminal.component.scss'],
})
export class ViewTerminalComponent implements OnInit {
  details: any;
  address: any;
  constructor(
    private router: Router,
    private merchantService: MerchantService,
    private terminalService: TerminalService,
    private route: ActivatedRoute
  ) {}
  public url = APIURL;
  options: google.maps.MapOptions = {
    center: { lat: 30.06648609010278, lng: 31.242701933248 },
    zoom: 6,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };
  center: google.maps.LatLngLiteral = {
    lat: 30.06648609010278,
    lng: 31.242701933248,
  };

  markerPositions: google.maps.LatLngLiteral[] = [];
  navigateToAdd() {
    this.router.navigate(['main/terminal/add']);
  }

  id;

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
  }

  getItemDetails() {
    this.terminalService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        console.log(this.details);
        this.handleAddress(resp);
      }
    });
  }
  handleAddress(resp: any) {
    this.markerPositions.push({
      lat: resp.data.latitude,
      lng: resp.data?.longitude,
    });
    this.options.center.lat = resp.data.latitude;
    this.options.center.lng = resp.data.longitude;
    this.terminalService
      .GetAddressFromLatLng(resp.data.latitude, resp.data.longitude)
      .subscribe((resp: any) => {
        this.address = resp?.address;
      });
  }

  backToList() {
    this.router.navigate(['main/terminal/all']);
  }
}
