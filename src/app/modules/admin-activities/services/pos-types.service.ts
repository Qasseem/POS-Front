import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PosTypesService {
  constructor(private http: HttpService) {}

  GetAllPOSTypes() {
    return this.http.getReq('/AdminActivities/GetPOSTypeGrid');
  }
  GetPOSTypesDetails(id) {
    return this.http.getHeaderReq('/AdminActivities/GetPOSTypeById', id);
  }
  AddPOSType(data) {
    return this.http.postReq('/AdminActivities/SavePOSType', data);
  }
  Block(data) {
    return this.http.postReq('/AdminActivities/BlockPOSType', data);
  }
}
