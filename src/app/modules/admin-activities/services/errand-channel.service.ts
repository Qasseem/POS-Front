import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ErrandChannelService {
  constructor(private http: HttpService) {}

  GetAllErrandsChannel() {
    return this.http.getReq('/AdminActivities/GetErrandChannelGrid');
  }
  GetErrandsChannelDetails(id) {
    return this.http.getHeaderReq('/AdminActivities/GetErrandChannelById', id);
  }
  AddErrandsChannel(data) {
    return this.http.postReq('/AdminActivities/SaveErrandChannel', data);
  }
  Block(data) {
    return this.http.postReq('/AdminActivities/BlockErrandChannel', data);
  }
}
