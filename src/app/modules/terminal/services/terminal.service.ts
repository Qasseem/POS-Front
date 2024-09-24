import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor(
    private http: HttpService,
    private httpPure: HttpClient,
    private dialogService: DialogService
  ) {}

  GetAllCities(parentId) {
    return this.http.getHeaderReq('/Terminal/GetAllCities', parentId);
  }

  GetAllCitiesFilter(parentId) {
    return this.http.getHeaderReq('/Terminal/GetAllCitiesFilter', parentId);
  }

  GetAllErrandChannels() {
    return this.http.getReq('/Terminal/GetAllErrandChannels');
  }

  GetAllPOSTypes() {
    return this.http.getReq('/Terminal/GetAllPOSTypes');
  }

  GetAllRegions() {
    return this.http.getReq('/Terminal/GetAllRegions');
  }

  GetAllRegionsFilter() {
    return this.http.getReq('/Terminal/GetAllRegionsFilter');
  }

  GetAllMerchantDropDown() {
    return this.http.getReq('/Terminal/GetAllMechantDropDown');
  }

  GetAllZones(parentId) {
    return this.http.getHeaderReq('/Terminal/GetAllZones', parentId);
  }

  Add(data) {
    return this.http.postReq('/Terminal/SaveTerminal', data);
  }

  GetDetails(id) {
    return this.http.getHeaderReq('/Terminal/GetTerminalById', id);
  }

  Favorite(data) {
    return this.http.postReq('/Terminal/AddFavorite', data);
  }

  Block(data) {
    return this.http.postReq('/Terminal/Block', data);
  }

  GetAddressFromLatLng(lat, lng) {
    let url =
      'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=json&location=' +
      lng +
      ',' +
      lat;
    return this.httpPure.get(url);
  }

  GetAllTerminalsByMerchantId(merchantId) {
    return this.http.getReq(
      '/Terminal/GetAllTerminalByMerchantId/' + merchantId
    );
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
