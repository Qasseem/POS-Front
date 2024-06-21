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
  GetMCCDetails(id) {
    return this.http.getHeaderReq(APIURL.AdminActivities.getOneMCC, id);
  }
  GetAllErrandsChannel() {
    return this.http.getReq(APIURL.AdminActivities.getErrandsChannel);
  }
  GetErrandsChannelDetails(id) {
    return this.http.getHeaderReq(
      APIURL.AdminActivities.getOneErrandsChannel,
      id
    );
  }
  GetAllCategoriesErrandsTypes() {
    return this.http.getReq(APIURL.ErrandsType.getErrandsType);
  }
  GetCategoriesErrandsTypesDetails(id) {
    return this.http.getHeaderReq(APIURL.ErrandsType.getOneErrandType, id);
  }
  GetAllPOSTypes() {
    return this.http.getReq(APIURL.AdminActivities.getPOSType);
  }
  GetPOSTypesDetails(id) {
    return this.http.getHeaderReq(APIURL.AdminActivities.getOnePOSType, id);
  }
  AddMCC(data) {
    return this.http.postReq(APIURL.AdminActivities.AddMCC, data);
  }
  AddErrandsChannel(data) {
    return this.http.postReq(APIURL.AdminActivities.AddErrandsChannel, data);
  }
  AddPOSType(data) {
    return this.http.postReq(APIURL.AdminActivities.AddPOSType, data);
  }
  AddErrandsType(data) {
    return this.http.postReq(APIURL.ErrandsType.addErrandType, data);
  }

  // Favorite(data) {
  //   return this.http.postReq(APIURL.Merchant.Favorite, data);
  // }
}
