import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs';
import { PosTypesService } from 'src/app/modules/admin-activities/services/pos-types.service';
import { NotificationCenterService } from '../../services/notification-center.service';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { UserService } from 'src/app/modules/user-management/services/user.service';
import { ToastService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-notfication-center-form',
  templateUrl: './notfication-center-form.component.html',
  styleUrl: './notfication-center-form.component.scss',
})
export class NotficationCenterFormComponent implements OnInit {
  alive: boolean = true;
  form: FormGroup;
  regionsList = [];
  citiesList = [];
  agentTypes = [];
  orignalCities = [];
  id;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: NotificationCenterService,
    private terminalService: TerminalService,
    private userService: UserService,
    private toaster: ToastService
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(250),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(500),
        ],
      ],
      userTypeId: [null],
      regionId: [null],
      cityIds: [[]],
    });
    this.getOptionLists();
    const regionControl = this.form.get('regionId');
    regionControl.valueChanges.subscribe({
      next: (regionId) => {
        if (regionId) {
          this.terminalService
            .GetAllCities(regionId)
            .pipe(takeWhile(() => this.alive))
            .subscribe({
              next: (resp) => {
                if (resp.success) {
                  this.citiesList = resp.data;
                  this.orignalCities = resp.data;
                  // cityControl.setValue(resp.data[0].id);
                }
              },
            });
        }
      },
    });
  }
  getOptionLists() {
    this.terminalService.GetAllRegions().subscribe({
      next: (res) => {
        this.regionsList = res.data;
      },
    });
    this.userService.getAllUsersTypeDropDown().subscribe({
      next: (res) => {
        this.agentTypes = res.data.filter((x) => x.id != 2);
      },
    });
  }
  regionChanged(event) {
    this.form.controls.cityId.setValue(null);
    this.citiesList = this.orignalCities;
    if (event) {
      this.citiesList = this.citiesList.filter(
        (x) => x.parentId == event.value
      );
    }
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
    this.service
      .addNotification(this.form.value)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (resp) => {
          if (resp.success) {
            let message = 'Notification Pushed Successfully';
            this.toaster.showSuccess(message);
            this.backToList();
          }
        },
      });
  }
  backToList() {
    this.router.navigate(['main/notification-center/list']);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
