import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpService) {}

  getOpenTickets(data) {
    return this.http.postReq(APIURL.dashboard.openTickets, data);
  }
}
