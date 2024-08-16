import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ScheduleTicketsService } from '../../services/schedule-tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';

@Component({
  selector: 'app-view-scheduled-ticket',
  templateUrl: './view-scheduled-ticket.component.html',
  styleUrl: './view-scheduled-ticket.component.scss',
})
export class ViewScheduledTicketComponent implements OnInit {
  coordinates;
  details;
  id;
  constructor(
    private service: ScheduleTicketsService,
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
    }
  }

  getViewDetails(id) {
    this.service.getById(id).subscribe({
      next: (res) => {
        this.details = res.data;
        this.coordinates = {
          lat: this.details.latitude,
          lng: this.details.longitude,
        };
        // this.handleAddress(res);
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
