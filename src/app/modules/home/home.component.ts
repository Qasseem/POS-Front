import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../terminal/services/terminal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { HomeService } from './services/home.service';

@Component({
  selector: 'oc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  regions = [];
  cities = [];
  dashboardForm: FormGroup;
  openTickets: any;
  data: any;
  options: any;
  constructor(
    private terminalService: TerminalService,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getRegions();
    this.regionValueChange();
    this.getOpenTickets();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Due', 'Over Due', 'Not Due'],
      datasets: [
        {
          data: [],
          backgroundColor: ['#54C737', '#E04E3F', '#0080F9'],
          hoverBackgroundColor: ['#54C737', '#E04E3F', '#0080F9'],
        },
      ],
    };

    this.options = {
      cutout: '60%',

      plugins: {
        legend: {
          display: false,
          labels: {
            color: textColor,
          },
        },
      },
    };
  }
  getOpenTickets() {
    combineLatest([
      this.dashboardForm.get('regionId').valueChanges,
      this.dashboardForm.get('cityId').valueChanges,
    ]).subscribe(([regionId, cityId]) => {
      if (regionId && cityId) {
        this.homeService
          .getOpenTickets({ regionId: regionId, cityId: cityId })
          .subscribe({
            next: (res) => {
              this.openTickets = res.data;
              this.data.datasets[0].data = [];
              this.data.datasets[0].data.push(this.openTickets.sla.due);
              this.data.datasets[0].data.push(this.openTickets.sla.overDue);
              this.data.datasets[0].data.push(this.openTickets.sla.notDue);
            },
          });
      }
    });
  }
  regionValueChange() {
    this.dashboardForm.get('regionId').valueChanges.subscribe({
      next: (regionId) => {
        if (regionId) {
          this.getCities(regionId);
        } else {
          this.dashboardForm.get('cityId').patchValue(null);
        }
      },
    });
  }
  initForm() {
    this.dashboardForm = this.fb.group({
      regionId: this.fb.control(null),
      cityId: this.fb.control(null),
    });
  }
  getRegions() {
    this.terminalService.GetAllRegions().subscribe({
      next: (res) => {
        this.regions = res.data;
      },
    });
  }

  getCities(regionId) {
    this.terminalService.GetAllCities(regionId).subscribe({
      next: (res) => {
        this.cities = res.data;
        // this.cities = this.filterDuplicates(this.cities);
      },
    });
  }
  filterDuplicates(items: any[]): any[] {
    const uniqueItems = items.reduce(
      (acc, item) => {
        // Check if the item ID already exists in the accumulator map
        if (!acc.map.has(item.id)) {
          acc.map.set(item.id, true); // Mark this ID as seen
          acc.result.push(item); // Add the item to the result array
        }
        return acc;
      },
      { map: new Map<number, boolean>(), result: [] as any[] }
    );

    return uniqueItems.result;
  }
}
