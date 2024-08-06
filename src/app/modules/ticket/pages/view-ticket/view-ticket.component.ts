import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'oc-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss'],
})
export class ViewTicketComponent implements OnInit {
  coordinates;
  details;
  id;
  constructor(
    private service: TicketService,
    private route: ActivatedRoute,
    private terminalService: TerminalService,
    private http: HttpClient,
    private router: Router
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
    if (this.id) {
      this.getViewDetails(this.id);
      this.getTicketFeedbacks();
    }
  }
  getTicketFeedbacks() {
    this.service.getAllFeedbacks().subscribe({
      next: (res) => {
        // console.log(res.data);
      },
    });
  }
  getViewDetails(id) {
    this.service.getById(id).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.details = res.data;
        this.coordinates = {
          lat: this.details.latitude,
          lng: this.details.longitude,
        };
        this.handleAddress(res);
      },
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
        this.details.address = resp.address;
      });
  }
  backToList() {
    this.router.navigate(['/main/ticket/list']);
  }
  downloadImage(url, filename) {
    this.http.get(url, { responseType: 'blob' }).subscribe({
      next: (blob: Blob) => {
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: (error) => {
        // console.error('Download failed', error);
      },
    });
  }
  getInitials(name: string): string {
    if (!name) return null;
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
  }
}
