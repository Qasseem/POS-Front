import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationsService } from '../../services/locations.service';

@Component({
  selector: 'oc-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
  form: FormGroup;
  categories = [];
  id;
  details: any;
  formType = 'add';
  constructor(
    private fb: FormBuilder,
    private locationService: LocationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    if (this.formType == 'edit') {
      this.id = this.route.snapshot.params.id || null;
      if (this.id) {
        this.getItemDetails();
      }
    }
    this.form = this.fb.group({
      merchantNameEN: ['', Validators.required],
      merchantNameAR: ['', Validators.required],
      userName: ['', Validators.required],
      categoryId: [null, Validators.required],
      id: [null],
    });
  }
  getItemDetails() {
    // this.locationService.GetDetails(this.id).subscribe((resp) => {
    //   if (resp.success) {
    //     this.details = resp.data;
    //     if (this.details) {
    //       this.form.patchValue(this.details);
    //       this.form.updateValueAndValidity();
    //     }
    //     console.log(this.details);
    //   }
    // });
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
    // this.locationService.Add(this.form.value).subscribe((resp) => {
    //   if (resp.success) {
    //     this.backToList();
    //   }
    // });
  }
  backToList() {
    this.router.navigate(['main/merchant/all']);
  }
}
