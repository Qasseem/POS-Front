import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';
import * as mime from 'mime';
import { AlertService } from 'src/app/core/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService, private alertService: AlertService) {}

  Save(data) {
    return this.http.postReq(APIURL.Users.addUser, data);
  }
  GetDetails(id) {
    return this.http.getHeaderReq(APIURL.Users.geUserById, id);
  }
  getAllRolesDropdown() {
    return this.http.getReq(APIURL.Role.getAllRolesDropdown);
  }
  getAllManagersDropdown() {
    return this.http.getReq(APIURL.Users.getAllManagerDropdown);
  }
}
