import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpService) {}

  addCity(data) {
    return this.http.postReq('/City/Add', data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq('/City/GetById', id);
  }

  update(id) {
    return this.http.postReq('/City/Update', id);
  }

  Block(data) {
    return this.http.postReq('/City/Block', data);
  }
}
