import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpService) {}

  addRegion(data) {
    return this.http.postReq(APIURL.Region.Add, data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq(APIURL.Region.GetOne, id);
  }

  update(id) {
    return this.http.getHeaderReq(APIURL.Region.Update, id);
  }
}
