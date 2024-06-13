import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent implements OnInit {
  form: FormGroup;
  categories = [];
  id;
  details: any;
  constructor(
    private fb: FormBuilder,
    private locationService: LocationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
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
