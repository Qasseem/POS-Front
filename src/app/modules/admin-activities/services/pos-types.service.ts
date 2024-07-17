import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class PosTypesService {
  constructor(private http: HttpService) {}

  GetAllPOSTypes() {
    return this.http.getReq(APIURL.AdminActivities.getPOSType);
  }
  GetPOSTypesDetails(id) {
    return this.http.getHeaderReq(APIURL.AdminActivities.getOnePOSType, id);
  }
  AddPOSType(data) {
    return this.http.postReq(APIURL.AdminActivities.AddPOSType, data);
  }
  Block(data) {
    return this.http.postReq(APIURL.AdminActivities.blockPOSType, data);
  }
}
