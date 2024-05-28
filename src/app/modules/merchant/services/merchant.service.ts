import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpService) {}

  GetAllMerchantCategories() {
    return this.http.getReq(APIURL.Merchant.GetAllMerchantCategories);
  }

  Add(data) {
    return this.http.postReq(APIURL.Merchant.Add, data);
  }
  GetDetails(id) {
    return this.http.getHeaderReq(APIURL.Merchant.GetOne, id);
  }

  Favorite(data) {
    return this.http.postReq(APIURL.Merchant.Favorite, data);
  }
}
