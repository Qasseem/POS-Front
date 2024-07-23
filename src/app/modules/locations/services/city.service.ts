import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpService) {}

  addCity(data) {
    return this.http.postReq(APIURL.City.Add, data);
  }

  getDetailsById(id) {
    return this.http.getHeaderReq(APIURL.City.GetOne, id);
  }

  update(id) {
    return this.http.postReq(APIURL.City.Update, id);
  }
  Block(data) {
    return this.http.postReq(APIURL.City.Block, data);
  }
}
