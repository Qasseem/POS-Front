import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  constructor(private http: HttpService) {}

  GetAllCities() {
    return this.http.getReq(APIURL.Terminal.GetAllCities);
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

  GetAllZones() {
    return this.http.getReq(APIURL.Terminal.GetAllZones);
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
