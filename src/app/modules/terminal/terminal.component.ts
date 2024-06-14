import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oc-terminal',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
