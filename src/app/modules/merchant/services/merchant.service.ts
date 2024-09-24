import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpService, public dialogService: DialogService) {}
  GetAllCities(parentId) {
    return this.http.getHeaderReq('/Terminal/GetAllCities', parentId);
  }

  GetAllRegions() {
    return this.http.getReq('/Terminal/GetAllRegions');
  }

  GetAllZones(parentId) {
    return this.http.getHeaderReq('/Terminal/GetAllZones', parentId);
  }

  GetAllMerchantCategories() {
    return this.http.getReq('/Merchant/GetAllMerchantCategories');
  }

  Save(data) {
    return this.http.postReq('/Merchant/SaveMerchant', data);
  }

  GetDetails(id) {
    return this.http.getHeaderReq('/Merchant/GetMerchantById', id);
  }

  Favorite(data) {
    return this.http.postReq('/Merchant/AddFavorite', data);
  }

  Block(data) {
    return this.http.postReq('/Merchant/Block', data);
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
}
