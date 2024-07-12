import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpService, public dialogService: DialogService) {}

  GetAllCities(parentId) {
    return this.http.getHeaderReq(APIURL.Terminal.GetAllCities, parentId);
  }

  GetAllRegions() {
    return this.http.getReq(APIURL.Terminal.GetAllRegions);
  }

  GetAllZones(parentId) {
    return this.http.getHeaderReq(APIURL.Terminal.GetAllZones, parentId);
  }

  GetAllMerchantCategories() {
    return this.http.getReq(APIURL.Merchant.GetAllMerchantCategories);
  }
  Save(data) {
    return this.http.postReq(APIURL.Merchant.Add, data);
  }
  GetDetails(id) {
    return this.http.getHeaderReq(APIURL.Merchant.GetOne, id);
  }

  Favorite(data) {
    return this.http.postReq(APIURL.Merchant.Favorite, data);
  }

  Block(data) {
    return this.http.postReq(APIURL.Merchant.Block, data);
  }

  confirm(
    msg: string = 'messages.block-item-content',
    title: string = 'messages.block-item-title',
    params = null,
    params2 = null
  ) {
    return this.dialogService.confirm(msg, title, params, params2);
  }
}
