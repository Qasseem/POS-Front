import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationCenterService {
  constructor(private http: HttpService) {}

  addNotification(body) {
    return this.http.postReq(APIURL.Notification.Add, body);
  }
}
