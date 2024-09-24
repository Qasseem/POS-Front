import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpService) {}

  addZone(data) {
    return this.http.postReq('/Zone/Add', data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq('/Zone/GetById', id);
  }

  update(id) {
    return this.http.postReq('/Zone/Update', id);
  }

  Block(data) {
    return this.http.postReq('/Zone/Block', data);
  }
}
