import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { TerminalService } from '../terminal/services/terminal.service';
import { TicketService } from '../ticket/services/ticket.service';
import { UserService } from '../user-management/services/user.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'oc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  regions = [];
  cities = [];
  categories = [];
  users = [];
  dashboardForm: FormGroup;
  openTickets: any;
  ticketStats: any;
  slaData: any;
  slaOptions: any;
  statusData: any;
  statusOptions: any;
  taskData: any;
  taskOptions: any;
  constructor(
    private terminalService: TerminalService,
    private fb: FormBuilder,
    private homeService: HomeService,
    private userService: UserService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getRegions();
    this.getUsers();
    this.getCategories();
    this.regionValueChange();
    this.getOpenTickets();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.slaData = {
      labels: ['Due', 'Over Due', 'Not Due'],
      datasets: [
        {
          data: [],
          backgroundColor: ['#54C737', '#E04E3F', '#0080F9'],
          hoverBackgroundColor: ['#54C737', '#E04E3F', '#0080F9'],
        },
      ],
    };

    this.slaOptions = {
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

    this.statusData = {
      labels: ['Assigned', 'Agent On Way', 'In Progress', 'Postponed', 'Done'],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#0080f9',
            '#f6c657',
            '#ff5c00',
            '#8d9cb8',
            '#54c737',
          ],
          hoverBackgroundColor: [
            '#0080f9',
            '#f6c657',
            '#ff5c00',
            '#8d9cb8',
            '#54c737',
          ],
        },
      ],
    };

    this.statusOptions = {
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

    this.taskData = {
      labels: ['Succeeded', 'Failed'],
      datasets: [
        {
          data: [],
          backgroundColor: ['#54c737', '#E04E3F'],
          hoverBackgroundColor: ['#54C737', '#E04E3F'],
        },
      ],
    };

    this.taskOptions = {
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
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data;
      },
    });
  }
  getCategories() {
    this.ticketService.getTicketCategory().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });
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
              if (
                !this.slaData?.sla.due &&
                !this.slaData?.sla.overDue &&
                !this.slaData.sla.notDue
              ) {
                this.slaData.datasets[0].data = [];
              } else {
                this.slaData.datasets[0].data = [];
                this.slaData.datasets[0].data.push(
                  this.openTickets.sla.due ? this.openTickets.sla.due : 0
                );
                this.slaData.datasets[0].data.push(
                  this.openTickets.sla.overDue
                    ? this.openTickets.sla.overDue
                    : 0
                );
                this.slaData.datasets[0].data.push(
                  this.openTickets.sla.notDue ? this.openTickets.sla.notDue : 0
                );
              }
            },
          });
      }
    });
    combineLatest([
      this.dashboardForm.get('regionId').valueChanges,
      this.dashboardForm.get('cityId').valueChanges,
      this.dashboardForm.get('statistics').get('createDate').valueChanges,
      this.dashboardForm.get('statistics').get('categoryId').valueChanges,
      this.dashboardForm.get('statistics').get('assigneeId').valueChanges,
    ]).subscribe({
      next: ([regionId, cityId, createDate, categoryId, assigneeId]) => {
        if (
          this.dashboardForm.get('statistics').valid &&
          !createDate.includes(null)
        ) {
          createDate = createDate.map((x) => {
            x = this.toLocalISOString(x);
            return x;
          });
          this.homeService
            .getTicketStats({
              createDate: createDate,
              regionId: regionId,
              cityId: cityId,
              categoryId: categoryId,
              assigneeId: assigneeId,
            })
            .subscribe({
              next: (res) => {
                this.ticketStats = res.data;
                this.ticketStats.transformedStatus = res.data.status.reduce(
                  (acc, item) => {
                    acc[this.toCamelCase(item.nameEn)] = item.count;
                    return acc;
                  },
                  {}
                );
                this.ticketStats.transformedTasks = res.data.tasks.reduce(
                  (acc, item) => {
                    acc[this.toCamelCase(item.nameEn)] = item.count;
                    return acc;
                  },
                  {}
                );
                if (
                  !this.ticketStats.transformedStatus.assigned &&
                  !this.ticketStats.transformedStatus.agentOnWay &&
                  !this.ticketStats.transformedStatus.inProgress &&
                  !this.ticketStats.transformedStatus.postponed &&
                  !this.ticketStats.transformedStatus.done
                ) {
                  this.statusData.datasets[0].data = [];
                } else {
                  this.statusData.datasets[0].data = [];
                  this.statusData.datasets[0].data.push(
                    this.ticketStats.transformedStatus.assigned
                      ? this.ticketStats.transformedStatus.assigned
                      : 0
                  );
                  this.statusData.datasets[0].data.push(
                    this.ticketStats.transformedStatus.agentOnWay
                      ? this.ticketStats.transformedStatus.agentOnWay
                      : 0
                  );
                  this.statusData.datasets[0].data.push(
                    this.ticketStats.transformedStatus.inProgress
                      ? this.ticketStats.transformedStatus.inProgress
                      : 0
                  );
                  this.statusData.datasets[0].data.push(
                    this.ticketStats.transformedStatus.postponed
                      ? this.ticketStats.transformedStatus.postponed
                      : 0
                  );
                  this.statusData.datasets[0].data.push(
                    this.ticketStats.transformedStatus.done
                      ? this.ticketStats.transformedStatus.done
                      : 0
                  );
                }
                this.statusData = { ...this.statusData };

                if (
                  !this.ticketStats.transformedTasks.succeeded &&
                  !this.ticketStats.transformedTasks.failed
                ) {
                  this.taskData.datasets[0].data = [];
                } else {
                  this.taskData.datasets[0].data = [];
                  this.taskData.datasets[0].data.push(
                    this.ticketStats.transformedTasks.succeeded
                      ? this.ticketStats.transformedTasks.succeeded
                      : 0
                  );
                  this.taskData.datasets[0].data.push(
                    this.ticketStats.transformedTasks.failed
                      ? this.ticketStats.transformedTasks.failed
                      : 0
                  );
                }
                this.taskData = { ...this.taskData };
              },
            });
        }
      },
    });
  }
  toCamelCase(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
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
      statistics: this.fb.group(
        {
          assigneeId: this.fb.control(null, [Validators.required]),
          categoryId: this.fb.control(null, [Validators.required]),
          createDate: this.fb.control([], [Validators.required]),
        },
        { validators: statsValidator() }
      ),
      performance: this.fb.group({
        assigneeId: this.fb.control(null),
        createDate: this.fb.control([]),
      }),
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
  toLocalISOString(date: any): string {
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = new Date(
      date.getTime() - timezoneOffset
    ).toISOString();
    return localISOTime;
  }
}
export function statsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = control.get('createDate')?.value;

    if (date[0] && date[1]) {
      const diffInMs =
        new Date(date[1]).getTime() - new Date(date[0]).getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 20) {
        return { dateRange: true };
      }
    }
    return null;
  };
}
export function taskValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const date = control.get('createDate')?.value;

    if (date[0] && date[1]) {
      const diffInMs =
        new Date(date[1]).getTime() - new Date(date[0]).getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays > 20) {
        return { dateRange: true };
      }
    }
    return null;
  };
}
