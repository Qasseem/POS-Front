import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor(private http: HttpService) {}

  GetAllCities(parentId) {
    return this.http.getHeaderReq(APIURL.Terminal.GetAllCities, parentId);
  }

  GetAllErrandChannels() {
    return this.http.getReq(APIURL.Terminal.GetAllErrandChannels);
  }

  GetAllPOSTypes() {
    return this.http.getReq(APIURL.Terminal.GetAllPOSTypes);
  }

  GetAllRegions() {
    return this.http.getReq(APIURL.Terminal.GetAllRegions);
  }
  GetAllMechantDropDown() {
    return this.http.getReq(APIURL.Terminal.GetAllMechantDropDown);
  }
  GetAllZones(parentId) {
    return this.http.getHeaderReq(APIURL.Terminal.GetAllZones, parentId);
  }

  Add(data) {
    return this.http.postReq(APIURL.Terminal.Add, data);
  }
  GetDetails(id) {
    return this.http.getHeaderReq(APIURL.Terminal.GetOne, id);
  }

  Favorite(data) {
    return this.http.postReq(APIURL.Terminal.Favorite, data);
  }
}
