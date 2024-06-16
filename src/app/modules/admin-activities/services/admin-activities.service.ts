import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class AdminActivitiesService {
  constructor(private http: HttpService) {}

  GetAllMerchantCategories() {
    return this.http.getReq(APIURL.Merchant.GetAllMerchantCategories);
  }
  GetAllErrandsChannel() {
    return this.http.getReq(APIURL.AdminActivities.getErrandsChannel)
  }
  GetAllCategoriesErrandsTypes() {
    return this.http.getReq(APIURL.ErrandsType.getErrandsType)
  }
  GetAllPOSTypes() {
    return this.http.getReq(APIURL.AdminActivities.getPOSType)
  }
  AddMCC(data) {
    return this.http.postReq(APIURL.AdminActivities.AddMCC, data);
  }

  // Favorite(data) {
  //   return this.http.postReq(APIURL.Merchant.Favorite, data);
  // }
}
