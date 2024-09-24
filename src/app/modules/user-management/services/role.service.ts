import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  Update(id) {
    return this.http.postReq('/Role/UpdateRole', id);
  }

  Add(data) {
    return this.http.postReq('/Role/AddRole', data);
  }

  GetDetails(id) {
    return this.http.getHeaderReq('/Role/GetRole', id);
  }

  getServicesByRoleId(id) {
    return this.http.getHeaderReq('/Role/GetRoleServiceDetails', id);
  }

  Block(data) {
    return this.http.postReq('/Role/Block', data);
  }
}
