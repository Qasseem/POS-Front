import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
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
    return this.http.postReq('/Ticket/Save', data);
  }

  getTicketCategory() {
    return this.http.getReq('/Ticket/GetTicketCategory');
  }

  getTicketCategoryFilter() {
    return this.http.getReq('/Ticket/GetTicketCategoryFilter/');
  }

  getById(id) {
    return this.http.getReq('/Ticket/GetById/' + id);
  }

  getCategoryErrandTypes(categoryId) {
    return this.http.getReq('/Ticket/GetCategoryErrandTypes/' + categoryId);
  }

  GetErrandTypeDropDown() {
    return this.http.postReq('/ErrandType/GetErrandTypeDropDown', null);
  }
  getZoneAgents(zoneId, categoryId) {
    return this.http.getReq(
      '/Ticket/GetZoneAgents/' + zoneId + '/' + categoryId
    );
  }

  getTerminalDetails(terminalId) {
    return this.http.getReq('/Ticket/GetTerminalDetails/' + terminalId);
  }

  Block(data) {
    return this.http.postReq('/Ticket/Block', data);
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
    return this.http.getReq('/Ticket/GetAllFeedbacks');
  }

  schedule(data) {
    return this.http.postReq('/Ticket/Schedule', data);
  }
}
