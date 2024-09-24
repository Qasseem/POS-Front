import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationCenterService {
  constructor(private http: HttpService) {}

  addNotification(body) {
    return this.http.postReq('/Notification/Add', body);
  }
}
