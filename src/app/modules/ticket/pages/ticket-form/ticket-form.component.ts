import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';

@Component({
  selector: 'oc-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss'],
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  formType = 'add';
  categories = [
    { name: 'Deployment', value: 'deployment', inputId: 'category-deployment' },
    { name: 'Visit', value: 'visit', inputId: 'category-visit' },
    {
      name: 'Cancellation',
      value: 'cancellation',
      inputId: 'category-canellation',
    },
    {
      name: 'After Sales',
      value: 'after-sales',
      inputId: 'category-after-sales',
    },
  ];
  errandTypes = [];
  merchants = [];
  terminals = [];
  assignees = [];

  constructor(
    private fb: FormBuilder,
    private service: TerminalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.ticketForm = this.fb.group({
      categoryId: ['', Validators.required],
      merchantId: [null, Validators.required],
      terminalId: [null, Validators.required],
      errandTypeId: [null, Validators.required],
      assigneeId: [{ value: null, disabled: true }, Validators.required],
      notes: [null],
      zoneId: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      posTypeId: [null, Validators.required],
      errandChannelId: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      address: [null, Validators.required],
      landMark: [null, [Validators.required]],
      attachmentsBase64: this.fb.array([]),
      errandTypes: this.fb.array([], Validators.required),
      id: [null],
    });
    this.addErrandType();
  }
  addErrandType() {
    const group = this.fb.group({
      errandTypeId: this.fb.control(null, Validators.required),
      quantity: this.fb.control(null, Validators.required),
    });
    (this.ticketForm.get('errandTypes') as FormArray).push(group);
  }
  removeErrandType(index) {
    (this.ticketForm.get('errandTypes') as FormArray).removeAt(index);
  }
  submit() {}

  backToList() {
    this.router.navigate(['main/ticket/list']);
  }
}
