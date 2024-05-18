import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css'],
})
export class AddMerchantComponent implements OnInit {
  form: FormGroup;
  categories = [];

  constructor(
    private fb: FormBuilder,
    private merchantService: MerchantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      merchantNameEN: ['', Validators.required],
      merchantNameAR: ['', Validators.required],
      userName: ['', Validators.required],
      categoryId: [null, Validators.required],
      id: [null],
    });

    this.GetAllMerchantCategories();
  }

  GetAllMerchantCategories() {
    this.merchantService.GetAllMerchantCategories().subscribe((resp) => {
      if (resp.success) {
        this.categories = resp.data;
      }
    });
  }
  onSubmit() {}
  get f() {
    return this.form.controls;
  }
  submit() {
    let obj = this.form.value;
    delete obj.id;
    this.merchantService.Add(this.form.value).subscribe((resp) => {
      if (resp.success) {
        this.backToList();
      }
    });
  }
  backToList() {
    this.router.navigate(['main/merchant/all']);
  }
}
