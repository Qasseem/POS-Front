import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.css'],
})
export class AddMerchantComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: [[], Validators.required],
      userName: [[], Validators.required],
      MerchantCategory: [[], Validators.required],
      checkbox: [false],
    });
  }

  onSubmit() {}
  get f() {
    return this.form.controls;
  }
}
