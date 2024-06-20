import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpService) {}

  addZone(data) {
    return this.http.postReq(APIURL.Zone.Add, data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq(APIURL.Zone.GetOne, id);
  }

  update(id) {
    return this.http.getHeaderReq(APIURL.Zone.Update, id);
  }
}
