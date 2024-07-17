import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class ErrandChannelService {
  constructor(private http: HttpService) {}

  GetAllErrandsChannel() {
    return this.http.getReq(APIURL.AdminActivities.getErrandsChannel);
  }
  GetErrandsChannelDetails(id) {
    return this.http.getHeaderReq(
      APIURL.AdminActivities.getOneErrandsChannel,
      id
    );
  }
  AddErrandsChannel(data) {
    return this.http.postReq(APIURL.AdminActivities.AddErrandsChannel, data);
  }
  Block(data) {
    return this.http.postReq(APIURL.AdminActivities.blockErrandsChannel, data);
  }
}
