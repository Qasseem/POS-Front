import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}

  update(id) {
    return this.http.postReq(APIURL.Role.updateRole, id);
  }
  Save(data) {
    return this.http.postReq(APIURL.Role.addRole, data);
  }
  GetDetails(id) {
    return this.http.getHeaderReq(APIURL.Role.getRoleById, id);
  }

  getServicesByRoleId(id) {
    return this.http.getHeaderReq(APIURL.Role.getRoleServiceDetails, id);
  }
}
