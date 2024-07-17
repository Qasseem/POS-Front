import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class MerchantCategoryService {
  constructor(private http: HttpService) {}
  GetMCCDetails(id) {
    return this.http.getHeaderReq(APIURL.AdminActivities.getOneMCC, id);
  }
  GetAllMerchantCategories() {
    return this.http.getReq(APIURL.Merchant.GetAllMerchantCategories);
  }
  AddMCC(data) {
    return this.http.postReq(APIURL.AdminActivities.AddMCC, data);
  }
  Block(data) {
    return this.http.postReq(APIURL.AdminActivities.blockMCC, data);
  }
}
