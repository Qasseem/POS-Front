import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';
import { DialogService } from 'src/app/services/dialog.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService, public dialogService: DialogService) {}

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
  getAllUsers() {
    return this.http.getReq(APIURL.Users.GetAllUsersDropDown);
  }

  UpdateUser(id) {
    return this.http.postReq(APIURL.Users.updateUser, id);
  }

  getAllUsersTypeDropDown() {
    return this.http.getReq(APIURL.Users.getAllUsersTypeDropdown);
  }

  Block(data) {
    return this.http.postReq(APIURL.Users.blockUser, data);
  }

  confirm(
    msg: string = 'messages.block-item-content',
    title: string = 'messages.block-item-title',
    params = null,
    params2 = null
  ) {
    return this.dialogService.confirm(msg, title, params, params2);
  }
}
