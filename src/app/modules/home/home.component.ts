import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { combineLatest, startWith } from 'rxjs';
import { TerminalService } from '../terminal/services/terminal.service';
import { TicketService } from '../ticket/services/ticket.service';
import { UserService } from '../user-management/services/user.service';
import { HomeService } from './services/home.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'oc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  regions = [];
  cities = [];
  categories = [];
  ticketsUsers = [];
  performanceUsers = [];
  agents = [];
  dashboardForm: FormGroup;
  openTickets: any;
  ticketStats: any;
  slaData: any;
  slaOptions: any;
  statusData: any;
  statusOptions: any;
  taskData: any;
  taskOptions: any;
  totalRecords: number = 0;
  loading: boolean;
  currentPage: number = 0;
  rows: number = 10;
  agentsData: any;

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
    this.getCategories();
    this.regionValueChange();
    this.getDashboard();
    this.getAgentTypes();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.slaData = {
      labels: ['Due', 'Over Due'],
      datasets: [
        {
          data: [],
          backgroundColor: ['#54C737', '#E04E3F'],
          hoverBackgroundColor: ['#54C737', '#E04E3F'],
        },
      ],
    };

    this.slaOptions = {
      cutout: '65%',

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
      cutout: '65%',

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
      cutout: '65%',

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
  getAgentTypes() {
    this.userService.getAllUsersTypeFilter().subscribe({
      next: (res) => {
        this.agents = res.data;
      },
    });
  }

  getCategories() {
    this.ticketService.getTicketCategoryFilter().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
    });

    this.dashboardForm
      .get('statistics')
      .get('agentTypeId')
      .valueChanges.subscribe({
        next: (agentTypeId) => {
          this.userService.getUsersByUserType(agentTypeId).subscribe({
            next: (res) => {
              this.ticketsUsers = res.data;
            },
          });
        },
      });
    this.dashboardForm
      .get('performance')
      .get('agentTypeId')
      .valueChanges.subscribe({
        next: (agentTypeId) => {
          this.userService.getUsersByUserType(agentTypeId).subscribe({
            next: (res) => {
              this.performanceUsers = res.data;
            },
          });
        },
      });
  }
  getDashboard() {
    combineLatest([
      this.dashboardForm.get('regionId').valueChanges,
      this.dashboardForm.get('cityId').valueChanges,
    ]).subscribe(([regionId, cityId]) => {
      if (regionId != null && cityId != null) {
        this.homeService
          .getOpenTickets({ regionId: regionId, cityId: cityId })
          .subscribe({
            next: (res) => {
              this.openTickets = res.data;
              if (
                !this.openTickets?.sla?.due &&
                !this.openTickets?.sla?.overDue
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
                // this.slaData.datasets[0].data.push(
                //   this.openTickets.sla.notDue ? this.openTickets.sla.notDue : 0
                // );
              }
              this.slaData = { ...this.slaData };
            },
          });
      }
    });

    combineLatest([
      this.dashboardForm
        .get('regionId')
        .valueChanges.pipe(
          startWith(this.dashboardForm.get('regionId')!.value)
        ),
      this.dashboardForm
        .get('cityId')
        .valueChanges.pipe(startWith(this.dashboardForm.get('cityId')!.value)),
      this.dashboardForm
        .get('statistics')
        .get('createDate')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('statistics').get('createDate')!.value
          )
        ),
      this.dashboardForm
        .get('statistics')
        .get('categoryId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('statistics').get('categoryId')!.value
          )
        ),
      this.dashboardForm
        .get('statistics')
        .get('assigneeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('statistics').get('assigneeId')!.value
          )
        ),
      this.dashboardForm
        .get('statistics')
        .get('agentTypeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('statistics').get('agentTypeId')!.value
          )
        ),
    ]).subscribe({
      next: ([
        regionId,
        cityId,
        createDate,
        categoryId,
        assigneeId,
        agentTypeId,
      ]) => {
        if (
          !createDate.includes(null) &&
          regionId !== null &&
          cityId !== null &&
          categoryId !== null &&
          assigneeId !== null &&
          agentTypeId !== null
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
              agentTypeId: agentTypeId,
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
    combineLatest([
      this.dashboardForm
        .get('regionId')
        .valueChanges.pipe(
          startWith(this.dashboardForm.get('regionId')!.value)
        ),
      this.dashboardForm
        .get('cityId')
        .valueChanges.pipe(startWith(this.dashboardForm.get('cityId')!.value)),
      this.dashboardForm
        .get('performance')
        .get('createDate')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('createDate')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('assigneeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('assigneeId')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('agentTypeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('agentTypeId')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('pageSize')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('pageSize')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('pageNumber')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('pageNumber')!.value
          )
        ),
    ]).subscribe({
      next: ([
        regionId,
        cityId,
        createDate,
        assigneeId,
        agentTypeId,
        pageSize,
        pageNumber,
      ]) => {
        if (
          !createDate.includes(null) &&
          regionId != null &&
          cityId != null &&
          assigneeId != null &&
          agentTypeId != null &&
          pageSize != null &&
          pageNumber != null
        ) {
          createDate = createDate.map((x) => {
            x = this.toLocalISOString(x);
            return x;
          });
          this.homeService
            .getPerformance({
              regionId: regionId,
              cityId: cityId,
              createDate: createDate,
              assigneeId: assigneeId,
              agentTypeId: agentTypeId,
              pageSize: pageSize,
              pageNumber: pageNumber,
            })
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  this.totalRecords = res?.data?.agents?.data.length;
                  this.agentsData = res.data;
                }
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
        this.dashboardForm.get('cityId').patchValue(null);
        this.getCities(regionId);
      },
    });
  }
  initForm() {
    this.dashboardForm = this.fb.group({
      regionId: this.fb.control(null),
      cityId: this.fb.control(null),
      statistics: this.fb.group({
        agentTypeId: this.fb.control(null, [Validators.required]),
        assigneeId: this.fb.control(null, [Validators.required]),
        categoryId: this.fb.control(null, [Validators.required]),
        createDate: this.fb.control([], [Validators.required]),
      }),
      performance: this.fb.group({
        assigneeId: this.fb.control(null, [Validators.required]),
        agentTypeId: this.fb.control(null, [Validators.required]),
        createDate: this.fb.control([], [Validators.required]),
        pageSize: this.fb.control(10),
        pageNumber: this.fb.control(0),
      }),
    });
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    this.dashboardForm
      .get('statistics')
      .get('createDate')
      .patchValue([startOfMonth, now]);
    this.dashboardForm
      .get('performance')
      .get('createDate')
      .patchValue([startOfMonth, now]);
  }
  getRegions() {
    this.terminalService.GetAllRegionsFilter().subscribe({
      next: (res) => {
        this.regions = res.data;
      },
    });
  }
  onPageChange(event) {
    this.currentPage = event.page;
    this.rows = event.rows;
    this.dashboardForm
      .get('performance')
      .get('pageNumber')
      .patchValue(this.currentPage);
    // this.loadData(this.currentPage, this.rows);
  }
  camelCaseToNormalString(camelCaseString: string): string {
    // Step 1: Insert spaces before uppercase letters
    let result = camelCaseString.replace(/([A-Z])/g, ' $1');

    // Step 2: Capitalize the first letter of each word
    result = result.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return result;
  }

  export() {
    // const transformedData = this.transformObjectKeys(
    //   this.agentsData?.agents?.data
    // );
    // const header = ["#", "Agent", "All Tickets", "Deployments", "Cancellation","After Sales",];
    // const dataArray = [header, ...transformedData];

    // // Create the worksheet
    // const worksheet = XLSX.utils.aoa_to_sheet(dataArray);

    // // Create the workbook with the worksheet
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // // Write the workbook to a buffer
    // const excelBuffer: any = XLSX.write(workbook, {
    //   bookType: 'xlsx',
    //   type: 'array',
    // });

    // // Save the buffer as an Excel file
    // this.saveAsExcelFile(excelBuffer, 'TransformedData');
    combineLatest([
      this.dashboardForm
        .get('regionId')
        .valueChanges.pipe(
          startWith(this.dashboardForm.get('regionId')!.value)
        ),
      this.dashboardForm
        .get('cityId')
        .valueChanges.pipe(startWith(this.dashboardForm.get('cityId')!.value)),
      this.dashboardForm
        .get('performance')
        .get('createDate')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('createDate')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('assigneeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('assigneeId')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('agentTypeId')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('agentTypeId')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('pageSize')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('pageSize')!.value
          )
        ),
      this.dashboardForm
        .get('performance')
        .get('pageNumber')
        .valueChanges.pipe(
          startWith(
            this.dashboardForm.get('performance').get('pageNumber')!.value
          )
        ),
    ]).subscribe({
      next: ([
        regionId,
        cityId,
        createDate,
        assigneeId,
        agentTypeId,
        pageSize,
        pageNumber,
      ]) => {
        if (
          !createDate.includes(null) &&
          regionId != null &&
          cityId != null &&
          assigneeId != null &&
          agentTypeId != null &&
          pageSize != null &&
          pageNumber != null
        ) {
          createDate = createDate.map((x) => {
            x = this.toLocalISOString(x);
            return x;
          });
          this.homeService
            .exportPerformanceData({
              regionId: regionId,
              cityId: cityId,
              createDate: createDate,
              assigneeId: assigneeId,
              agentTypeId: agentTypeId,
              pageSize: pageSize,
              pageNumber: pageNumber,
            })
            .subscribe({
              next: (res: any) => {
                if (res.success) {
                  window.open(res.data, '_blank');
                }
              },
            });
        }
      },
    });
  }

  transformObjectKeys(obj: { [key: string]: any }): [number, string, any][] {
    const transformedObj: [number, string, any][] = [];
    let index = 1; // Start index from 1
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const normalKey = this.camelCaseToNormalString(key);
        transformedObj.push([index, normalKey, obj[key]]);
        index++;
      }
    }
    return transformedObj;
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
  getCities(regionId) {
    this.terminalService.GetAllCitiesFilter(regionId).subscribe({
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
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.dashboardForm
        .get('performance')
        .get('pageNumber')
        .patchValue(this.currentPage);
    }
  }

  nextPage() {
    if (
      this.agentsData?.agents?.data.length &&
      this.currentPage <
        Math.ceil(this.agentsData?.agents?.data.length / this.rows) - 1
    ) {
      this.currentPage++;
      this.dashboardForm
        .get('performance')
        .get('pageNumber')
        .patchValue(this.currentPage);
    }
  }
  getCurrentPage() {
    return (
      Math.ceil(
        (this.agentsData ? this.agentsData?.agents?.data?.length : 0) /
          this.rows
      ) - 1
    );
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
