import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ErrandTypeService {
  constructor(private http: HttpService) {}

  GetAllCategoriesErrandsTypes() {
    return this.http.getReq('/ErrandType/GetErrandTypeGrid');
  }
  GetCategoriesErrandsTypesDetails(id) {
    return this.http.getHeaderReq('/ErrandType/GetById', id);
  }
  getCategoriesFixed() {
    return this.http.getReq('/Ticket/GetTicketCategory');
  }
  AddErrandsType(data) {
    return this.http.postReq('/ErrandType/SaveErrandType', data);
  }
  Block(data) {
    return this.http.postReq('/ErrandType/Block', data);
  }
}
