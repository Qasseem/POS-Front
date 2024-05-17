import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../../services/merchant.service';

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
    private merchantService: MerchantService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: [[], Validators.required],
      userName: [[], Validators.required],
      merchantCategory: [[], Validators.required],
      checkbox: [false],
    });

    this.GetAllMerchantCategories();
  }

  GetAllMerchantCategories() {
    this.merchantService.GetAllMerchantCategories().subscribe((resp) => {
      console.log(resp);

      if (resp.success) {
        this.categories = resp.data;
      }
    });
  }
  onSubmit() {}
  get f() {
    return this.form.controls;
  }
}
