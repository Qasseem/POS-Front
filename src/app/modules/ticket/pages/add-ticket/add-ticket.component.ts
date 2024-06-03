import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css'],
})
export class AddTicketComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: TerminalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      errandTypeId: [null, Validators.required],
      quantity: [null, Validators.required],
      merchantId: [null, Validators.required],
      terminalId: [null, Validators.required],
      assigneeId: [null, Validators.required],
      notes: [null, Validators.required],
      zoneId: [null, Validators.required],
      address: [null, Validators.required],
      landMark: [null, [Validators.required]],
      id: [null],
    });
  }
}
