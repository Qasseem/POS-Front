import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ScheduleTicketsService } from '../../services/schedule-tickets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-scheduled-ticket',
  templateUrl: './view-scheduled-ticket.component.html',
  styleUrl: './view-scheduled-ticket.component.scss',
})
export class ViewScheduledTicketComponent implements OnInit {
  coordinates;
  details;
  id;
  currentPage: number = 0;
  rows: number = 10;
  scheduleTicketData: any = [];
  scheduleForm: FormGroup;
  totalRecords;
  constructor(
    private service: ScheduleTicketsService,
    private route: ActivatedRoute,
    private terminalService: TerminalService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = this.route.snapshot.params.id;
    this.scheduleForm = this.fb.group({
      pageNumber: [0],
      pageSize: [10],
      scheduleId: [this.id],
      key: [''],
    });
    this.getScheduleTicketsGrid(this.scheduleForm.value);
  }
  getScheduleTicketsGrid(formValue) {
    this.service.getScheduleTickets(formValue).subscribe({
      next: (res) => {
        this.scheduleTicketData = res.data.data;
        this.scheduleForm.get('pageNumber').patchValue(res.data.pageNumber);
        this.scheduleForm.get('pageSize').patchValue(res.data.pageSize);
      },
    });
  }

  tabsChange(event) {
    if (!event.index) {
      this.scheduleForm.get('key').patchValue('');
      this.getScheduleTicketsGrid(this.scheduleForm.value);
    } else {
      const keyValue = event.index == 1 ? 'open' : 'completed';
      this.scheduleForm.get('key').patchValue(keyValue);
      this.getScheduleTicketsGrid(this.scheduleForm.value);
    }
  }
  ngOnInit() {
    if (this.id) {
      this.getViewDetails(this.id);
    }
  }
  onPageChange(event) {
    this.currentPage = event.page;
    this.rows = event.rows;
    this.scheduleForm.get('pageNumber').patchValue(this.currentPage);
    // this.loadData(this.currentPage, this.rows);
    this.getScheduleTicketsGrid(this.scheduleForm.value);
  }
  convertToKebabCase(input: string): string {
    return input
      .toLowerCase() // Convert the string to lowercase
      .replace(/&/g, 'and') // Replace '&' with 'and' if needed
      .replace(/[^\w\s-]/g, '') // Remove any non-word characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace one or more spaces with a hyphen
      .replace(/-+/g, '-');
  }
  goToTicket(id) {
    // this.router.navigate(['/main/ticket/details/' + id]);
    window.open('/main/ticket/details/' + id, '_blank');
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
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.scheduleTicketData.get('pageNumber').patchValue(this.currentPage);
    }
  }

  nextPage() {
    if (
      this.scheduleTicketData?.length &&
      this.currentPage <
        Math.ceil(this.scheduleTicketData?.length / this.rows) - 1
    ) {
      this.currentPage++;
      this.scheduleTicketData.get('pageNumber').patchValue(this.currentPage);
    }
  }
  getCurrentPage() {
    return (
      Math.ceil(
        (this.scheduleTicketData ? this.scheduleTicketData?.length : 0) /
          this.rows
      ) - 1
    );
  }
}
