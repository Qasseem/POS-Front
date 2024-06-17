import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public url = APIURL;
  formType = 'view';
  coordinates = { lat: null, lng: null };

  markerPositions = [];
  constructor(
    private router: Router,
    private terminalService: TerminalService,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

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
        this.handleAddress(resp);
      }
    });
  }
  handleAddress(resp: any) {
    this.coordinates = {
      lat: resp.data.latitude,
      lng: resp.data.longitude,
    };
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
