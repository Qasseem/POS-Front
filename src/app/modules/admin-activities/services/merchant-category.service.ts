import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class MerchantCategoryService {
  constructor(private http: HttpService) {}
  GetMCCDetails(id) {
    return this.http.getHeaderReq(
      '/AdminActivities/GetMerchantCategoryById',
      id
    );
  }
  GetAllMerchantCategories() {
    return this.http.getReq('/Merchant/GetAllMerchantCategories');
  }
  AddMCC(data) {
    return this.http.postReq('/AdminActivities/SaveMerchantCategory', data);
  }
  Block(data) {
    return this.http.postReq('/AdminActivities/BlockMerchantCategory', data);
  }
}
