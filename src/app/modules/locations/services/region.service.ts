import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  constructor(private http: HttpService) {}

  addRegion(data) {
    return this.http.postReq('/Region/Add', data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq('/Region/GetById', id);
  }

  update(id) {
    return this.http.postReq('/Region/Update', id);
  }

  Block(data) {
    return this.http.postReq('/Region/Block', data);
  }
}
