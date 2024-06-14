import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TerminalComponent } from './terminal.component';
import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalListComponent } from './pages/terminal-list/terminal-list.component';
import { ViewTerminalComponent } from './pages/view-terminal/view-terminal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, TerminalRoutingModule, SharedModule],
  declarations: [TerminalComponent, TerminalListComponent, ViewTerminalComponent],
})
export class TerminalModule { }
