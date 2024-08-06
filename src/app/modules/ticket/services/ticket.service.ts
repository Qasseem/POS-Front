import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private http: HttpService,
    private dialogService: DialogService
  ) {}

  // Favorite(data) {
  //   return this.http.postReq(APIURL.Terminal.Favorite, data);
  // }

  Save(data) {
    return this.http.postReq(APIURL.Ticket.Save, data);
  }

  getTicketCategory() {
    return this.http.getReq(APIURL.Ticket.GetTicketCategory);
  }
  getTicketCategoryFilter() {
    return this.http.getReq(APIURL.Ticket.GetTicketCategoryFilter);
  }
  getById(id) {
    return this.http.getReq(APIURL.Ticket.GetOne + id);
  }

  getCategoryErrandTypes(categoryId) {
    return this.http.getReq(APIURL.Ticket.GetCategoryErrandsTypes + categoryId);
  }

  getZoneAgents(zoneId, categoryId) {
    return this.http.getReq(
      APIURL.Ticket.GetZoneAgents + zoneId + '/' + categoryId
    );
  }

  getTerminalDetails(terminalId) {
    return this.http.getReq(APIURL.Ticket.GetTerminalDetails + terminalId);
  }

  getTicketsByStatus(data) {
    return this.http.postReq(APIURL.Ticket.GetTicketByStatus, data);
  }

  goToCustomer(data) {
    return this.http.postReq(APIURL.Ticket.GoToCustomer, data);
  }

  startTicket(data) {
    return this.http.postReq(APIURL.Ticket.TicketStart, data);
  }

  resumeTicket(data) {
    return this.http.postReq(APIURL.Ticket.TicketResume, data);
  }

  posponeTicket(data) {
    return this.http.postReq(APIURL.Ticket.TicketPostpone, data);
  }

  getDeploymentStatus(ticketId) {
    return this.http.getReq(APIURL.Ticket.TicketDeploymentStatus + ticketId);
  }

  startInstall(data) {
    return this.http.postReq(APIURL.Ticket.TicketStartInstall, data);
  }
  Block(data) {
    return this.http.postReq(APIURL.Ticket.Block, data);
  }
  confirm(
    msg: string = 'messages.block-item-content',
    title: string = 'messages.block-item-title',
    params = null,
    params2 = null,
    ok: string = 'OK',
    cancel: string = 'Cancel'
  ) {
    return this.dialogService.confirm(msg, title, ok, cancel, params, params2);
  }
  getAllFeedbacks() {
    return this.http.getReq(APIURL.Ticket.GetAllFeedbacks);
  }
}
