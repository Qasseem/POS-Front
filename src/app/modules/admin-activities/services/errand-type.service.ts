import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class ErrandTypeService {
  constructor(private http: HttpService) {}

  GetAllCategoriesErrandsTypes() {
    return this.http.getReq(APIURL.ErrandsType.getErrandsType);
  }
  GetCategoriesErrandsTypesDetails(id) {
    return this.http.getHeaderReq(APIURL.ErrandsType.getOneErrandType, id);
  }
  getCategoriesFixed() {
    return this.http.getReq(APIURL.Ticket.GetTicketCategory);
  }
  AddErrandsType(data) {
    return this.http.postReq(APIURL.ErrandsType.addErrandType, data);
  }
  Block(data) {
    return this.http.postReq(APIURL.ErrandsType.blockErrandType, data);
  }
}
